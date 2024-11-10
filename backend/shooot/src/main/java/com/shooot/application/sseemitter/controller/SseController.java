package com.shooot.application.sseemitter.controller;

import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.sseemitter.repository.SseNotificationRepository;
import com.shooot.application.sseemitter.service.ProjectSseColdStreamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@RequestMapping("/sse")
@RestController
public class SseController {
    private final SseNotificationRepository sseNotificationRepository;
    private final ProjectSseColdStreamService projectSseColdStreamService;


    @GetMapping("/notification/connection")
    public ResponseEntity<SseEmitter> connectionNotificationSse(@AuthenticationPrincipal UserLoginContext userLoginContext) {
        SseEmitter sseEmitter = sseNotificationRepository.putNewSseEmitter(userLoginContext.getUserId());
        return ResponseEntity.ok(sseEmitter);
    }


    @GetMapping("/project/{projectId}/connection")
    public ResponseEntity<SseEmitter> connectionProjectSse(@PathVariable Integer projectId, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        SseEmitter subscribe = projectSseColdStreamService.subscribe(projectId, userLoginContext.getUserId());
        return ResponseEntity.ok(subscribe);
    }
}
