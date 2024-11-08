package com.shooot.dockermanager.publisher;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class RedisMessagePublisher {

    private final StringRedisTemplate redisTemplate;

    private static final String LOG_CHANNEL = "docker_logs";

    public void publishLog(MessageDto logMessage) {
        redisTemplate.convertAndSend(LOG_CHANNEL, logMessage);
    }
}
