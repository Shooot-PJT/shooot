package com.shooot.application.api.ui;

import com.shooot.application.api.service.command.test.TestCaseRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projectClient")
@Slf4j
public class ProjectClientController {
    private final TestCaseRequestService testCaseRequestService;

    @PostMapping("/testcases/{testcaseId}")
    public ResponseEntity<?> sendTestCaseRequest(
        @PathVariable Integer testcaseId
    ){
        testCaseRequestService.testCaseResponse(testcaseId);

        return ResponseEntity.ok(null);
    }


    @PostMapping("/postman")
    public void logHeaders(@RequestHeader HttpHeaders headers, @RequestBody Map<String, Object> requestBody) {
        // 헤더 정보 출력
        System.out.println("Received Headers: " + headers);
        System.out.println("requestBody = " + requestBody);
    }
}
