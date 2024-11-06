package com.shooot.dockermanager.controller;

import com.shooot.dockermanager.docker.DockerManager;
import com.shooot.dockermanager.dto.ServiceStartDto;
import com.shooot.dockermanager.dto.ServiceStopDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Getter
@RequiredArgsConstructor
@RequestMapping("/project")
@RestController
public class ProjectController {

    private final DockerManager dockerManager;

    @PostMapping("/start")
    public ResponseEntity<?> startService(@RequestBody ServiceStartDto serviceStartDto) throws IOException {
        dockerManager.startDockerCompose(serviceStartDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/stop")
    public ResponseEntity<?> stopService(@RequestBody ServiceStopDto serviceStopDto) {
        dockerManager.stopDockerCompose(serviceStopDto);
        return ResponseEntity.ok().build();
    }
}
