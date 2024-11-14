package com.shooot.application.sseemitter.service;

import com.shooot.application.stresstest.controller.dto.StressTestDto;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
public class StressTestSseService {

    private final ConcurrentHashMap<Integer, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public SseEmitter add(Integer projectJarFileId) {
        SseEmitter sseEmitter = new SseEmitter();
        try {
            sseEmitter.send(SseEmitter.event().name("connect").data("connected!"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return sseEmitters.put(projectJarFileId, sseEmitter);
    }

    public void send(Integer projectJarFileId, StressTestDto dto) {
        SseEmitter sseEmitter = sseEmitters.get(projectJarFileId);
        try {
            sseEmitter.send(
                SseEmitter.event().name("test_data").data(dto, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
