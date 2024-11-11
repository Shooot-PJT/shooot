package com.shooot.application.projecttest.subscriber;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.sseemitter.repository.SseProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.connection.stream.StreamReadOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class ConsoleLogStreamSubscriber  implements StreamListener<String, MapRecord<String, Object, Object>> {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final Map<Integer, Map<Integer, SseEmitter>> projectEmitters = new ConcurrentHashMap<>();

    @Autowired
    public ConsoleLogStreamSubscriber(StringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
        startListening();
    }

    public SseEmitter addEmitter(Integer projectId, Integer projectParticipantId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        projectEmitters.computeIfAbsent(projectId, k -> new ConcurrentHashMap<>()).put(projectParticipantId, emitter);

        // 콜드 스트림 - 구독 시 이전 로그 데이터 전송
        List<MapRecord<String, Object, Object>> coldStreamLogs = redisTemplate.opsForStream()
                .read(StreamOffset.fromStart("project_logs_" + projectId));

        for (MapRecord<String, Object, Object> record : coldStreamLogs) {
            sendLog(emitter, record);
        }

        emitter.onCompletion(() -> projectEmitters.get(projectId).remove(projectParticipantId));
        emitter.onTimeout(() -> projectEmitters.get(projectId).remove(projectParticipantId));
        return emitter;
    }

    private void startListening() {
        new Thread(() -> {
            while (true) {
                projectEmitters.keySet().forEach(projectId -> {
                    redisTemplate.opsForStream()
                            .read(StreamReadOptions.empty().count(1000).noack(), StreamOffset.fromStart("project_logs_" + projectId));
                });
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }

        }).start();
    }

    @Override
    public void onMessage(MapRecord<String, Object, Object> record) {
        Integer projectId = Integer.valueOf(record.getValue().get("projectId").toString());
        String jsonMessage = record.getValue().get("message").toString();
        log.info("[{}] : {}", projectId, jsonMessage);
        projectEmitters.getOrDefault(projectId, Map.of()).forEach((userId, emitter) -> sendLog(emitter, record));
    }

    private void sendLog(SseEmitter emitter, MapRecord<String, Object, Object> record) {
        String jsonMessage = record.getValue().get("message").toString();

        try {
            MessageDto messageDto = objectMapper.readValue(jsonMessage, MessageDto.class);
            emitter.send(SseEmitter.event()
                    .name("project-log")
                    .data(messageDto));
        } catch (IOException e) {
            emitter.completeWithError(e);
        }
    }
}
