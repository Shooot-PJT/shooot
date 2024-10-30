package com.shooot.application.api.ui;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.service.command.test.ApiTestCaseCreateService;
import com.shooot.application.api.service.command.test.dto.ApiTestCaseCreateRequest;
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


}
