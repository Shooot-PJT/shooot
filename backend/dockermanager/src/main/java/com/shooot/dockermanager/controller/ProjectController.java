package com.shooot.dockermanager.controller;

import com.shooot.dockermanager.dto.ServiceStopDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/stop")
    public ResponseEntity<?> stopService(@RequestBody ServiceStopDto serviceStopDto) {
        try {
            ProcessBuilder pb = new ProcessBuilder("/path/to/stop_service.sh", serviceStopDto.getProjectName());
            Process process = pb.start();
            process.waitFor();

            if(process.exitValue() == 0) {
                return ResponseEntity.ok().build();
            }else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서비스 종료 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류 발생 : " + e.getMessage());
        }
    }
}
