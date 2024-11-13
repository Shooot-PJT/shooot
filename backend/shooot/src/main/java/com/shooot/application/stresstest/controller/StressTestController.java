package com.shooot.application.stresstest.controller;

import com.shooot.application.stresstest.service.StressTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/stress-test")
@RestController
public class StressTestController {

    private final StressTestService stressTestService;

    @GetMapping
    public ResponseEntity<Void> stressTest(
        @RequestParam Integer vuserNum,
        @RequestParam Integer duration,
        @RequestParam String method
    ) {
        switch (method) {
            case "FIXED":
                stressTestService.fixed(vuserNum, duration);
                break;
            case "SPIKE":
                stressTestService.spike(vuserNum, duration);
                break;
            case "RAMP_UP":
                stressTestService.rampUp(vuserNum, duration);
                break;
        }
        return ResponseEntity.ok().build();
    }
}
