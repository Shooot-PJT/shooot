package com.shooot.application.sseemitter.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SseRepository {
    private final ConcurrentHashMap<Integer, SseEmitter> sseEmitters = new ConcurrentHashMap<>();


    public SseEmitter putNewSseEmitter(Integer userId) {
        SseEmitter sseEmitter = new SseEmitter();
        try {
            sseEmitter.send(SseEmitter.event().name("connect").data("connected").build());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        sseEmitter.onTimeout(sseEmitter::complete);
        sseEmitter.onCompletion(() -> sseEmitters.remove(userId));
        return sseEmitters.put(userId, sseEmitter);
    }

    public void sendEvent(Integer userId, Set<ResponseBodyEmitter.DataWithMediaType> event) {
        try {
            sseEmitters.get(userId).send(event);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
