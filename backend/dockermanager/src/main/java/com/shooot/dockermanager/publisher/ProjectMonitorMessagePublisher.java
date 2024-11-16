package com.shooot.dockermanager.publisher;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ProjectMonitorMessagePublisher {

    private static final String MONITOR_CHANNEL = "project_monitor_";
    private final ObjectMapper objectMapper;
    private final StringRedisTemplate redisTemplate;

    public void publish(ProjectMonitorMessage message) {
        String key = MONITOR_CHANNEL + message.getProjectId();
        try {
            String json = objectMapper.writeValueAsString(message);
            MapRecord<String, Object, Object> record = StreamRecords.newRecord()
                .in(key)
                .ofMap(Map.of("message", json));
            redisTemplate.opsForStream().add(record);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
