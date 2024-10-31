package com.shooot.dockermanager.controller;

import com.shooot.dockermanager.dto.ServiceStartDto;
import com.shooot.dockermanager.dto.ServiceStopDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
