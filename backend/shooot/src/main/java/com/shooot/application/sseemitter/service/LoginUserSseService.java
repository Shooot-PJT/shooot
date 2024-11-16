package com.shooot.application.sseemitter.service;

import com.shooot.application.stresstest.controller.dto.StressTestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class LoginUserSseService {
    private final ConcurrentHashMap<Integer, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public SseEmitter add(Integer userId) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("connect").data("connected!"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        sseEmitter.onTimeout(() -> sseEmitters.remove(userId));
        sseEmitter.onCompletion(() -> sseEmitters.remove(userId));
        sseEmitters.put(userId, sseEmitter);
        return sseEmitter;
    }

    public void send(Integer projectJarFileId, StressTestDto dto) {
        SseEmitter sseEmitter = sseEmitters.get(projectJarFileId);
        try {
            sseEmitter.send(
                    SseEmitter.event().name("test_data").data(dto, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitter.complete();
        }
    }

}
