package com.shooot.application.projecttest.subscriber;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectBuildLog;
import com.shooot.application.projecttest.domain.ProjectBuildStatus;
import com.shooot.application.projecttest.domain.repository.ProjectBuildLogRepository;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.data.redis.stream.Subscription;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ConsoleLogStreamSubscriber implements StreamListener<String, MapRecord<String, String, String>> {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final Map<Integer, Map<Integer, SseEmitter>> projectEmitters = new ConcurrentHashMap<>();
    private final Map<Integer, Subscription> subscriptions = new ConcurrentHashMap<>();
    private StreamMessageListenerContainer<String, MapRecord<String, String, String>> listenerContainer;
    private final ProjectBuildLogRepository projectBuildLogRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private static final String PROJECT_LOG = "project_log";
    private static final String PROJECT_STATUS = "project_status";

    @Autowired
    public ConsoleLogStreamSubscriber(StringRedisTemplate redisTemplate, ObjectMapper objectMapper, ProjectBuildLogRepository projectBuildLogRepository, ProjectBuildRepository projectBuildRepository) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
        this.projectBuildLogRepository = projectBuildLogRepository;
        this.projectBuildRepository = projectBuildRepository;
    }

    @PostConstruct
    public void startListening() {
        StreamMessageListenerContainer.StreamMessageListenerContainerOptions<String, MapRecord<String, String, String>> options =
                StreamMessageListenerContainer.StreamMessageListenerContainerOptions.builder()
                        .pollTimeout(Duration.ofMillis(100)) // 폴링 타임아웃 설정
                        .build();

        listenerContainer = StreamMessageListenerContainer.create(Objects.requireNonNull(redisTemplate.getConnectionFactory()), options);
        listenerContainer.start();
        addSubscriptionForProject(2);

    }

    @Async
    @Scheduled(cron = "*/10 * * * * *")
    public void executeSseConnectionCheck() {
        projectEmitters.forEach((projectId, integerSseEmitterMap) -> {
            integerSseEmitterMap.forEach((userId, sseEmitter) -> {
                try {
                    sseEmitter.send(SseEmitter.event().name("connection").data("connected"));
                } catch (IOException ignored) {
                    sseEmitter.completeWithError(ignored);
                }
            });
        });
    }

    public void addSubscriptionForProject(Integer projectId) {
        // 이미 구독 중이라면 새로 추가하지 않음
        if (subscriptions.containsKey(projectId)) {
            return;
        }

        // 새로운 프로젝트 ID에 대한 구독 생성
        Subscription subscription = listenerContainer.receive(
                StreamOffset.fromStart("project_logs_" + projectId),
                this);

        subscriptions.put(projectId, subscription);
        log.info("Subscribed to project_logs_{}", projectId);
    }

    public SseEmitter addEmitter(Integer projectId, Integer projectParticipantId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        projectEmitters.computeIfAbsent(projectId, k -> {
            addSubscriptionForProject(projectId);
            return new ConcurrentHashMap<>();
        }).put(projectParticipantId, emitter);

        // 콜드 스트림 - 구독 시 이전 로그 데이터 전송
        List<MapRecord<String, Object, Object>> coldStreamLogs = redisTemplate.opsForStream()
                .read(StreamOffset.fromStart("project_logs_" + projectId));

        if (coldStreamLogs == null) {
            try {
                emitter.send(SseEmitter.event().name("connection").data("connection success"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            for (MapRecord<String, Object, Object> record : coldStreamLogs) {
                sendLog(emitter, convertRecord(record));
            }
        }

        emitter.onCompletion(() -> projectEmitters.get(projectId).remove(projectParticipantId));
        emitter.onTimeout(() -> projectEmitters.get(projectId).remove(projectParticipantId));
        return emitter;
    }

    @Override
    public void onMessage(MapRecord<String, String, String> record) {
        try {
            String jsonMessage = record.getValue().get("message");
            Map<String, Object> dtoMap = objectMapper.readValue(jsonMessage, Map.class);
            log.info("[] : {}", dtoMap);

            MessageDto.Type type = MessageDto.Type.valueOf((String) dtoMap.get("type"));

            Message message = null;
            String emitterType = null;
            ProjectBuildStatus status = null;
            switch (type) {
                case DOCKER_CONSOLE_LOG:
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerConsoleLogMessage.class);
                    emitterType = PROJECT_LOG;
                    Message finalMessage = message;
                    String finalEmitterType1 = emitterType;
                    projectEmitters.getOrDefault(message.getProjectId(), Map.of()).forEach((userId, emitter) -> sendLog(emitter, finalMessage, finalEmitterType1));
                    return;
                case DOCKER_BUILD_ERROR:
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
                    status = ProjectBuildStatus.BUILD_ERROR;
                    emitterType = PROJECT_STATUS;
                    break;
                case DOCKER_RUNTIME_ERROR:
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
                    status = ProjectBuildStatus.RUNTIME_ERROR;
                    emitterType = PROJECT_STATUS;
                    break;
                case DOCKER_RUN:
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
                    status = ProjectBuildStatus.RUN;
                    emitterType = PROJECT_STATUS;
                    break;
                case DOCKER_RUN_DONE:
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
                    status = ProjectBuildStatus.DONE;
                    emitterType = PROJECT_STATUS;
                    break;
            }

            ToStatusMessage toStatusMessage = new ToStatusMessage(message, status);
            String finalEmitterType = emitterType;

            if (emitterType.equals(PROJECT_STATUS)) {
                Integer projectJarFileId = message.getProjectJarFileId();
                ProjectBuild referenceById = projectBuildRepository.getReferenceById(projectJarFileId);
                ProjectBuildStatus finalStatus = status;
                ProjectBuildLog projectBuildLog = projectBuildLogRepository.findByProjectBuild_Id(projectJarFileId).orElseGet(() -> ProjectBuildLog.builder().projectBuild(referenceById).status(finalStatus).build());
                projectBuildLog.updateStatus(finalStatus);
                projectBuildLogRepository.save(projectBuildLog);
            }

            projectEmitters.getOrDefault(message.getProjectId(), Map.of()).forEach((userId, emitter) -> sendLog(emitter, toStatusMessage, finalEmitterType));
        } catch (JsonProcessingException ignored) {

        }

    }

    private void sendLog(SseEmitter emitter, Message message, String emitterName) {
        try {
            emitter.send(SseEmitter.event()
                    .name(emitterName)
                    .data(message));
        } catch (IOException e) {
            emitter.completeWithError(e);
        }
    }

    private void sendLog(SseEmitter emitter, ToStatusMessage message, String emitterName) {
        try {
            emitter.send(SseEmitter.event()
                    .name(emitterName)
                    .data(message));
        } catch (IOException e) {
            emitter.completeWithError(e);
        }
    }

    private void sendLog(SseEmitter emitter, MapRecord<String, String, String> record) {
        try {
            String jsonMessage = record.getValue().get("message");
            Map<String, Object> dtoMap = objectMapper.readValue(jsonMessage, Map.class);
            log.info("[] : {}", dtoMap.get("message"));

            MessageDto.Type type = MessageDto.Type.valueOf((String) dtoMap.get("type"));

            Message message = null;
            String emitterType = null;
            if (type == MessageDto.Type.DOCKER_CONSOLE_LOG) {
                message = objectMapper.convertValue(dtoMap.get("message"), DockerConsoleLogMessage.class);
                emitterType = PROJECT_LOG;
            } else {
                message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
                emitterType = PROJECT_STATUS;
            }

            Message finalMessage = message;
            emitter.send(SseEmitter.event()
                    .name(emitterType)
                    .data(finalMessage));

        } catch (IOException e) {
            emitter.completeWithError(e);
        }
    }

    private MapRecord<String, String, String> convertRecord(MapRecord<String, Object, Object> record) {
        // Map<Object, Object>를 Map<String, String>으로 변환
        Map<String, String> value = record.getValue().entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> entry.getKey().toString(),
                        entry -> Objects.toString(entry.getValue(), null)
                ));
        return MapRecord.create(Objects.requireNonNull(record.getStream()), value).withId(record.getId());
    }

    @Getter
    @NoArgsConstructor
    private static class ToStatusMessage {
        private Integer projectId;
        private Integer projectJarFileId;
        private ProjectBuildStatus status;

       private  ToStatusMessage(Message message, ProjectBuildStatus status) {
           this.projectId = message.getProjectId();
           this.projectJarFileId = message.getProjectJarFileId();
           this.status = status;
       }
    }
}
