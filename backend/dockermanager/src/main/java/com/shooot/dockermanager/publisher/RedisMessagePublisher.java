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

}
