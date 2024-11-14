package com.shooot.dockermanager.publisher;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Component
public class RedisMessagePublisher {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private static final String LOG_CHANNEL = "project_logs_";

    // 프로젝트 로그 스트림 초기화 메서드
    public void initializeLogStream(Integer projectId) {
        String streamKey = LOG_CHANNEL + projectId;
        // 기존 스트림 삭제
        initStream(projectId);
        // 새로운 스트림 시작을 알리는 초기 메시지 추가 (선택사항)
        redisTemplate.opsForStream().trim(streamKey, 1000);
    }

    // 로그 전송 메서드
    public void publishLog(MessageDto messageDto) {
        String streamKey = LOG_CHANNEL + messageDto.getMessage().getProjectId();
        try {
            String jsonMessage = objectMapper.writeValueAsString(messageDto);

            // MapRecord 생성 후 Redis Stream에 추가
            MapRecord<String, Object, Object> record = StreamRecords.newRecord()
                    .in(streamKey)
                    .ofMap(Map.of("message", jsonMessage));

            redisTemplate.opsForStream().add(record);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);

        }
    }

    public void initStream(Integer projectId) {
        String streamKey = LOG_CHANNEL + projectId;
        // 기존 스트림 0으로 초기화 후 다시 1000으로 초기화
        redisTemplate.opsForStream().trim(streamKey, 0);
        redisTemplate.opsForStream().trim(streamKey, 1000);
    }
}
