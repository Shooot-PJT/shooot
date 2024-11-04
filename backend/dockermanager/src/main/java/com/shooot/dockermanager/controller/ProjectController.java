package com.shooot.dockermanager.controller;

import com.shooot.dockermanager.dto.ServiceStartDto;
import com.shooot.dockermanager.dto.ServiceStopDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Getter
@AllArgsConstructor
@RequestMapping("/project")
@RestController
public class ProjectController {

    @PostMapping("/start")
    public ResponseEntity<?> startService(@RequestBody ServiceStartDto serviceStartDto) throws IOException {
        return null;
    }

    @PostMapping("/stop")
    public ResponseEntity<?> stopService(@RequestBody ServiceStopDto serviceStopDto) {
        return null;
    }
}
