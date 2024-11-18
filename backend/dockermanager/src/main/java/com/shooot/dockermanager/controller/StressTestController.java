package com.shooot.dockermanager.controller;

import com.shooot.dockermanager.dto.StressTestStartRequest;
import com.shooot.dockermanager.dto.StressTestStopRequest;
import com.shooot.dockermanager.service.StressTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/stress-test")
@RestController
public class StressTestController {

    private final StressTestService stressTestService;

    @PostMapping("/start")
    public ResponseEntity<Void> start(@RequestBody StressTestStartRequest request) {
        stressTestService.start(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/stop")
    public ResponseEntity<Void> stop(@RequestBody StressTestStopRequest request) {
        stressTestService.stop(request.getProjectJarFileId());
        return ResponseEntity.ok().build();
    }
}
