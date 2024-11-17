package com.shooot.application.sseemitter.service;

import com.shooot.application.notification.service.NotificationSendService;
import com.shooot.application.notification.ui.dto.NotificationView;
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

    public void send(Integer userId, NotificationView notificationView) {
        SseEmitter sseEmitter = sseEmitters.get(userId);
        try {
            if(sseEmitter == null) return;
            sseEmitter.send(
                    SseEmitter.event().name("notification_data").data(notificationView, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitter.complete();
        }
    }

}
