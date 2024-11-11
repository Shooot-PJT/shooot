package com.shooot.application.projecttest.subscriber;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.data.redis.stream.Subscription;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import jakarta.annotation.PostConstruct;
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

    @Autowired
    public ConsoleLogStreamSubscriber(StringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
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
        SseEmitter emitter = new SseEmitter();
        projectEmitters.computeIfAbsent(projectId, k -> {
            addSubscriptionForProject(projectId);
            return new ConcurrentHashMap<>();
        }).put(projectParticipantId, emitter);

        // 콜드 스트림 - 구독 시 이전 로그 데이터 전송
        List<MapRecord<String, Object, Object>> coldStreamLogs = redisTemplate.opsForStream()
            .read(StreamOffset.fromStart("project_logs_" + projectId));

        if(coldStreamLogs == null) {
            try {
                emitter.send(SseEmitter.event().data("connection").data("connection success").build());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }else {
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

            MessageDto.Type type = MessageDto.Type.valueOf((String)dtoMap.get("type"));
            if(type == null) {
                return;
            }

            Message message = null;
            if (type == MessageDto.Type.DOCKER_CONSOLE_LOG) {
                message = objectMapper.convertValue(dtoMap.get("message"), DockerConsoleLogMessage.class);
            } else {
                message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
            }

            Message finalMessage = message;
            projectEmitters.getOrDefault(finalMessage.getProjectId(), Map.of()).forEach((userId, emitter) -> sendLog(emitter, finalMessage));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    private void sendLog(SseEmitter emitter, Message message) {
        try {
            emitter.send(SseEmitter.event()
                    .name("project-log")
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

                MessageDto.Type type = MessageDto.Type.valueOf((String)dtoMap.get("type"));
                if(type == null) {
                    return;
                }

                Message message = null;
                if (type == MessageDto.Type.DOCKER_CONSOLE_LOG) {
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerConsoleLogMessage.class);
                } else {
                    message = objectMapper.convertValue(dtoMap.get("message"), DockerMessage.class);
                }

                Message finalMessage = message;
                emitter.send(SseEmitter.event()
                        .name("project-log")
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
        return MapRecord.create(record.getStream(), value).withId(record.getId());
    }

}