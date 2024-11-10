package com.shooot.dockermanager.publisher;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.ObjectRecord;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Component
public class RedisMessagePublisher {

    private final StringRedisTemplate redisTemplate;
    private final Map<String, Boolean> groupCache = new ConcurrentHashMap<>();

    private static final String LOG_CHANNEL = "project.stream.";

    public void publishLog(MessageDto logMessage) {
        Integer projectId = logMessage.getMessage().getProjectId();

        String streamKey = "project.stream." + projectId;
        String groupName = "projectGroup-" + projectId;

        groupCache.computeIfAbsent(groupName, key -> {
            try {
                redisTemplate.opsForStream().createGroup(streamKey, key);
                return true;
            } catch (Exception e) {
                return true;
            }
        });

        // 메시지 추가, 최대 엔트리 1000개로 제한
        ObjectRecord<String, MessageDto> record = StreamRecords.newRecord()
                .ofObject(logMessage)
                .withStreamKey(streamKey);

        redisTemplate.opsForStream()
                .trim(streamKey, 1000); // 최대 엔트리 수 제한
        redisTemplate.opsForStream().add(record);
    }
    }
}
