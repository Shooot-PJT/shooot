package com.shooot.application.api.ui;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.service.command.test.ApiTestCaseCreateService;
import com.shooot.application.api.service.command.test.ApiTestCaseDeleteService;
import com.shooot.application.api.service.command.test.ApiTestCaseModifyService;
import com.shooot.application.api.service.command.test.dto.ApiTestCaseCreateRequest;
import com.shooot.application.api.service.command.test.dto.ApiTestCaseModifyRequest;
import com.shooot.application.api.service.query.test.TestCaseGetService;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/domains/apis")
@Slf4j
public class ApiTestCaseController {
    private final ApiTestCaseCreateService apiTestCaseCreateService;
    private final ApiTestCaseDeleteService apiTestCaseDeleteService;
    private final ApiTestCaseModifyService apiTestCaseModifyService;
    private final TestCaseGetService testCaseGetService;

    @PostMapping("/{apiId}/testcases")
    public ResponseEntity<?> createTestCase(
            @PathVariable(name = "apiId") Integer apiId,
            ApiTestCaseCreateRequest apiTestCaseCreateRequest,
            @RequestParam(required = false, name = "data") String data
    ) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> contentMap = objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {});
        Map<String, Object> content = new HashMap<>();

        content.put("data", contentMap);
        content.put("title", apiTestCaseCreateRequest.getTitle());
        content.put("expectHttpStatus", apiTestCaseCreateRequest.getExpectHttpStatus());
        log.info("asdf = {}", content);

        ApiTestCaseView apiTestCaseView = apiTestCaseCreateService.create(apiId, content);

        return ResponseEntity.ok(apiTestCaseView);
    }

    @DeleteMapping("/testcases/{testcaseId}")
    public ResponseEntity<?> deleteTestCase(@PathVariable Integer testcaseId){
        apiTestCaseDeleteService.delete(testcaseId);

        return ResponseEntity.ok(null);
    }

    @PatchMapping("/testcase/{testcaseId}")
    public ResponseEntity<?> modifyTestCase(
            @PathVariable Integer testcaseId,
            ApiTestCaseModifyRequest apiTestCaseModifyRequest,
            @RequestParam(required = false, name = "data") String data
    ) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> contentMap = objectMapper.readValue(data, new TypeReference<Map<String, Object>>() {});
        Map<String, Object> content = new HashMap<>();

        content.put("data", contentMap);
        content.put("title", apiTestCaseModifyRequest.getTitle());
        content.put("expectHttpStatus", apiTestCaseModifyRequest.getExpectHttpStatus());
        log.info("asdf = {}", content);

        ApiTestCaseView apiTestCaseView = apiTestCaseModifyService.modify(testcaseId, content);
        log.info("apiTestCaseView = {}", apiTestCaseView);

        return ResponseEntity.ok(apiTestCaseView);
    }

    @GetMapping("/{apiId}/testcases")
    public ResponseEntity<?> getTestCaseList(
            @PathVariable(name = "apiId") Integer apiId
    ){
        testCaseGetService.getList(apiId);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/testcases/{testcaseId}")
    public ResponseEntity<?> getTestCase(
            @PathVariable(name = "testcaseId") Integer testcaseId
    ){
        ApiTestCaseView testCaseView = testCaseGetService.get(testcaseId);

        return ResponseEntity.ok(testCaseView);
    }



}
