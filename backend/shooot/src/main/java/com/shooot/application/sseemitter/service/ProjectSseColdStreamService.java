package com.shooot.application.sseemitter.service;

import com.shooot.application.sseemitter.repository.SseProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
public class ProjectSseColdStreamService {
    private final SseProjectRepository sseProjectRepository;
    private static final String PUB_SUB_KEY = "docker_logs";

    private final StringRedisTemplate stringRedisTemplate;

    public SseEmitter subscribe(Integer projectId, Integer userId) {
        SseEmitter emitter = sseProjectRepository.putNewSseEmitter(projectId, userId);
        return emitter;
    }

}
