package com.shooot.application.sseemitter.controller;

import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.sseemitter.repository.SseNotificationRepository;
import com.shooot.application.sseemitter.service.ProjectSseColdStreamService;
import com.shooot.application.sseemitter.service.StressTestSseService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/sse")
@RestController
public class SseController {

    private final SseNotificationRepository sseNotificationRepository;
    private final ProjectSseColdStreamService projectSseColdStreamService;
    private final StressTestSseService stressTestSseService;

    @GetMapping("/notification/connection")
    public ResponseEntity<SseEmitter> connectionNotificationSse(
        @AuthenticationPrincipal UserLoginContext userLoginContext, HttpServletResponse response) {
        SseEmitter sseEmitter = sseNotificationRepository.putNewSseEmitter(
            userLoginContext.getUserId());
        response.setHeader("X-Accel-Buffering", "no");
        return ResponseEntity.ok(sseEmitter);
    }

    @GetMapping(value = "/project/{projectId}/connection", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectionProjectSse(@PathVariable Integer projectId,
        @AuthenticationPrincipal UserLoginContext userLoginContext, HttpServletResponse response) {
        SseEmitter subscribe = projectSseColdStreamService.subscribe(projectId,
            userLoginContext.getUserId());
        log.info("connection Return done ");
        response.setHeader("X-Accel-Buffering", "no");
        return ResponseEntity.ok(subscribe);
    }

    @GetMapping(value = "/projects/jarFile/{projectJarFileId}/connection", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectionStressTest(
        @PathVariable Integer projectJarFileId,
        HttpServletResponse response
    ) {
        SseEmitter emitter = stressTestSseService.add(projectJarFileId);
        response.setHeader("X-Accel-Buffering", "no");
        return ResponseEntity.ok(emitter);
    }
}
