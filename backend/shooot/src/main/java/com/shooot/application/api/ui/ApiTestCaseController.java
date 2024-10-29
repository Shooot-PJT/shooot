package com.shooot.application.api.ui;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.service.command.test.ApiTestCaseCreateService;
import com.shooot.application.api.service.command.test.dto.ApiTestCaseCreateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/domains/apis")
@Slf4j
public class ApiTestCaseController {
    private final ApiTestCaseCreateService apiTestCaseCreateService;

    @PostMapping("/{apiId}/testcases")
    public ResponseEntity<?> createTestCase(
            ApiTestCaseCreateRequest apiTestCaseCreateRequest,
            @RequestParam(required = false, name = "data") String data,
            @RequestHeader (required = false) Map<String, Object> headers
    ) throws Exception{
        log.info("data = {}", data);
//        log.info("data = {}", apiTestCreateRequest.getData());
        log.info("apiTestCase... title = {}, statusCode = {}", apiTestCaseCreateRequest.getTitle(), apiTestCaseCreateRequest.getExpectHttpStatus());
        log.info("headers = {}", headers);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> contentMap = objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {});

        log.info("contentMap = {}", contentMap);
        apiTestCaseCreateService.createTestCase();


        return ResponseEntity.ok(null);
    }


}
