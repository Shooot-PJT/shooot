package com.shooot.application.stresstest.service;

import com.shooot.application.stresstest.controller.dto.StressTestSseResponse;
import com.shooot.application.stresstest.controller.dto.TestStateDto;
import com.shooot.application.stresstest.ui.dto.StressTestUsageResponse;
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

    public SseEmitter connect(Integer projectJarFileId) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitter.onTimeout(() -> sseEmitters.remove(projectJarFileId));
        sseEmitter.onCompletion(() -> sseEmitters.remove(projectJarFileId));
        try {
            sseEmitter.send(SseEmitter.event().name("connect").data("connected!"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        sseEmitters.put(projectJarFileId, sseEmitter);
        return sseEmitter;
    }

    public void sendUsage(Integer projectJarFileId, StressTestUsageResponse response) {
        SseEmitter sseEmitter = sseEmitters.get(projectJarFileId);
        try {
            sseEmitter.send(
                SseEmitter.event().name("test_data").data(response, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void send(Integer projectJarFileId, StressTestSseResponse dto) {
        SseEmitter sseEmitter = sseEmitters.get(projectJarFileId);
        try {
            sseEmitter.send(
                SseEmitter.event().name("test_data").data(dto, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitter.complete();
        }
    }

    public void start(Integer projectJarFileId) {
        SseEmitter sseEmitter = sseEmitters.get(projectJarFileId);
        try {
            sseEmitter.send(SseEmitter.event().name("test_state")
                .data(TestStateDto.builder().state("start").build(), MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitter.complete();
        }
    }

    public void end(Integer projectJarFileId) {
        SseEmitter sseEmitter = sseEmitters.get(projectJarFileId);
        try {
            sseEmitter.send(SseEmitter.event().name("test_state")
                .data(TestStateDto.builder().state("end").build(), MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitter.complete();
        }
    }
}
