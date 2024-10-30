package com.shooot.application.sseemitter.controller;

import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.sseemitter.repository.SseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@RequestMapping("/sse")
@RestController
public class SseController {
    private final SseRepository sseRepository;

    @GetMapping("/connection")
    public ResponseEntity<SseEmitter> connectionSse(@AuthenticationPrincipal UserLoginContext userLoginContext) {
        SseEmitter sseEmitter = sseRepository.putNewSseEmitter(userLoginContext.getUserId());
        return ResponseEntity.ok(sseEmitter);
    }
}
