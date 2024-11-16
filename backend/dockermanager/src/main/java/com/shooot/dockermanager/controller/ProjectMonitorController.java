package com.shooot.dockermanager.controller;

import com.shooot.dockermanager.dto.ProjectMonitorRequest;
import com.shooot.dockermanager.service.ProjectMonitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/stress-test")
@RestController
public class ProjectMonitorController {

    private final ProjectMonitorService projectMonitorService;

    @PostMapping("/start")
    public ResponseEntity<Void> startProjectMonitor(@RequestBody ProjectMonitorRequest request) {
        projectMonitorService.getStatus(request.getProjectId(), request.getProjectJarFileId(),
            request.getDuration(), request.getMethod(), request.getUrl());
        return ResponseEntity.ok().build();
    }
}
