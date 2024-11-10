package com.shooot.application.sseemitter.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Repository
public class SseProjectRepository {
    private final ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, SseEmitter>> sseEmitters = new ConcurrentHashMap<>();
    private final StringRedisTemplate stringRedisTemplate;

    public SseEmitter putNewSseEmitter(Integer userId, Integer projectId) {
        SseEmitter sseEmitter = new SseEmitter();
        sseEmitter.onTimeout(sseEmitter::complete);
        sseEmitter.onCompletion(() -> sseEmitters.getOrDefault(projectId, new ConcurrentHashMap<>()).remove(userId));

        // 구독 시작 시 SseEmitter 저장
        sseEmitters.computeIfAbsent(projectId, k -> new ConcurrentHashMap<>()).put(userId, sseEmitter);

        return sseEmitter;
    }

    public ConcurrentHashMap<Integer, SseEmitter> getEmittersByProjectId(Integer projectId) {
        return sseEmitters.getOrDefault(projectId, new ConcurrentHashMap<>());
    }
}
