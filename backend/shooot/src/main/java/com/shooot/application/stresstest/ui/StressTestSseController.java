package com.shooot.application.stresstest.ui;

import com.shooot.application.stresstest.service.StressTestSseService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@RestController
public class StressTestSseController {

    private final StressTestSseService stressTestSseService;

    @GetMapping(value = "/projects/jarFile/{projectJarFileId}/connection", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@PathVariable Integer projectJarFileId,
        HttpServletResponse response) {
        SseEmitter emitter = stressTestSseService.connect(projectJarFileId);
        response.setHeader("X-Accel-Buffering", "no");
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(emitter);
    }
}
