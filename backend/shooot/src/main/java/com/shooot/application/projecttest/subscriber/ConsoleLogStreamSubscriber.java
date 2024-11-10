package com.shooot.application.projecttest.subscriber;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.sseemitter.repository.SseProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RequiredArgsConstructor
@Service
public class ConsoleLogStreamSubscriber {


    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final SseProjectRepository sseProjectRepository;
    private final Map<Integer, String> consumerNames = new ConcurrentHashMap<>();

    @PostConstruct
    public void startListeningToStream() {
        // 각 프로젝트에 대해 Consumer Group을 생성하여 팀원이 개별적으로 읽을 수 있게 설정
        sseProjectRepository.getProjectIds().forEach(this::initializeConsumerGroup);
    }

    private void initializeConsumerGroup(Integer projectId) {
        String streamKey = "project.stream." + projectId;
        String groupName = "projectGroup-" + projectId;

        try {
            redisTemplate.opsForStream().createGroup(streamKey, groupName);
        } catch (Exception e) {
            // Consumer Group이 이미 존재하는 경우 예외 무시
        }
    }

    public void subscribeToProjectLog(Integer projectId, Integer userId) {
        String streamKey = "project.stream." + projectId;
        String groupName = "projectGroup-" + projectId;
        String consumerName = "user-" + userId;

        consumerNames.put(userId, consumerName); // 각 사용자별 Consumer 이름 등록

        // Redis Streams에서 각 사용자가 개별 오프셋으로 구독하도록 설정
        redisTemplate.opsForStream()
                .readGroup(groupName, consumerName, MapRecord.class, StreamOffset.lastConsumed(streamKey))
                .forEach(record -> processRecord(record, projectId, userId));
    }

    private void processRecord(MapRecord<String, String, String> record, Integer projectId, Integer userId) {
        String logMessage = record.getValue().get("message"); // 메시지 내용 추출
        sendLogToSubscriber(projectId, userId, logMessage);
    }

    private void sendLogToSubscriber(Integer projectId, Integer userId, String logMessage) {
        SseEmitter emitter = sseProjectRepository.getEmitterByUserId(projectId, userId);

        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("log").data(logMessage));
            } catch (IOException e) {
                emitter.complete();
                sseProjectRepository.removeEmitter(projectId, userId);
            }
        }
    }
}
