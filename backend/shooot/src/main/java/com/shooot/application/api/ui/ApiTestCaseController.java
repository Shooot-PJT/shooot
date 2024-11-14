package com.shooot.application.api.ui;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.domain.ApiTestCaseRequestType;
import com.shooot.application.api.domain.interceptor.ProjectDomainType;
import com.shooot.application.api.domain.interceptor.RequiresProjectParticipation;
import com.shooot.application.api.service.command.testcase.ApiTestCaseCreateService;
import com.shooot.application.api.service.command.testcase.ApiTestCaseDeleteService;
import com.shooot.application.api.service.command.testcase.ApiTestCaseModifyService;
import com.shooot.application.api.service.command.testcase.dto.ApiTestCaseCreateRequest;
import com.shooot.application.api.service.command.testcase.dto.ApiTestCaseModifyRequest;
import com.shooot.application.api.service.command.testcase.dto.TestLogSearchRequest;
import com.shooot.application.api.service.query.testcase.TestCaseGetService;
import com.shooot.application.api.service.query.testcase.TestCaseLogsGetService;
import com.shooot.application.api.ui.dto.ApiTestCaseListView;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import com.shooot.application.api.ui.dto.TestCaseView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
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
    private final TestCaseLogsGetService testCaseLogsGetService;

    @PostMapping("/{apiId}/testcases")
    @RequiresProjectParticipation(type = ProjectDomainType.API)
    public ResponseEntity<?> createTestCase(
            @PathVariable(name = "apiId") Integer apiId,
                ApiTestCaseCreateRequest apiTestCaseCreateRequest,
            @RequestParam(required = false, name = "content") String content
    ) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> contentMap = objectMapper.readValue(content, new TypeReference<Map<String, Object>>() {});
        Map<String, Object> data = new HashMap<>();

        ApiTestCaseRequestType type = ApiTestCaseRequestType.valueOf(apiTestCaseCreateRequest.getType().toString().toUpperCase());

        data.put("content", contentMap);
        data.put("title", apiTestCaseCreateRequest.getTitle());
//        data.put("type", apiTestCaseCreateRequest.getType().equals("json") ? ApiTestCaseRequestType.JSON : ApiTestCaseRequestType.MULTIPART);
        data.put("type", type);
        data.put("httpStatusCode", apiTestCaseCreateRequest.getHttpStatusCode());
        log.info("asdf = {}", data);

        ApiTestCaseView apiTestCaseView = apiTestCaseCreateService.create(apiId, data);

        return ResponseEntity.ok(apiTestCaseView);
    }

    @DeleteMapping("/testcases/{testcaseId}")
    @RequiresProjectParticipation(type = ProjectDomainType.TESTCASE)
    public ResponseEntity<?> deleteTestCase(@PathVariable Integer testcaseId){
        apiTestCaseDeleteService.delete(testcaseId);

        return ResponseEntity.ok(null);
    }

    @PatchMapping("/testcases/{testcaseId}")
    @RequiresProjectParticipation(type = ProjectDomainType.TESTCASE)
    public ResponseEntity<?> modifyTestCase(
            @PathVariable Integer testcaseId,
            ApiTestCaseModifyRequest apiTestCaseModifyRequest,
            @RequestParam(required = false, name = "content") String content
    ) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> contentMap = objectMapper.readValue(content, new TypeReference<Map<String, Object>>() {});
        Map<String, Object> data = new HashMap<>();

        ApiTestCaseRequestType type = ApiTestCaseRequestType.valueOf(apiTestCaseModifyRequest.getType().toString().toUpperCase());

        data.put("content", contentMap);
        data.put("title", apiTestCaseModifyRequest.getTitle());
        data.put("httpStatusCode", apiTestCaseModifyRequest.getHttpStatusCode());
        data.put("type", type);
//        data.put("type", apiTestCaseModifyRequest.getType().equals("json") ? ApiTestCaseRequestType.JSON : ApiTestCaseRequestType.MULTIPART);
        log.info("asdf = {}", data);
        log.info("getcontent = {} ", data.get("content"));

        ApiTestCaseView apiTestCaseView = apiTestCaseModifyService.modify(testcaseId, data);
        log.info("apiTestCaseView = {}", apiTestCaseView);

        return ResponseEntity.ok(apiTestCaseView);
    }

    @GetMapping("/{apiId}/testcases")
    @RequiresProjectParticipation(type = ProjectDomainType.API)
    public ResponseEntity<?> getTestCaseList(
            @PathVariable(name = "apiId") Integer apiId
    ){
        List<ApiTestCaseListView> apiTestCaseListViews = testCaseGetService.getList(apiId);

        return ResponseEntity.ok(apiTestCaseListViews);
    }

    @GetMapping("/testcases/{testcaseId}")
    @RequiresProjectParticipation(type = ProjectDomainType.TESTCASE)
    public ResponseEntity<?> getTestCase(
            @PathVariable(name = "testcaseId") Integer testcaseId
    ){
        TestCaseView testCaseView = testCaseGetService.get(testcaseId);

        return ResponseEntity.ok(testCaseView);
    }

    @GetMapping("/testcases/{testcaseId}/logs")
    @RequiresProjectParticipation(type = ProjectDomainType.TESTCASE)
    public ResponseEntity<?> getTestLogs(
            @PathVariable(name = "testcaseId") Integer testcaseId,
            @RequestParam(required = false) Integer testerId,
            @RequestParam(required = false) Boolean isSuccess,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @PageableDefault(size = 4, page = 0) Pageable pageable
    ){

        TestLogSearchRequest testLogSearchRequest = TestLogSearchRequest.builder()
                .testcaseId(testcaseId)
                .testerId(testerId)
                .isSuccess(isSuccess)
                .startDate(startDate)
                .endDate(endDate)
                .build();

        log.info("testLogSearchRequest = {}", testLogSearchRequest);
        log.info("pageable = {}", pageable);

        return ResponseEntity.ok(testCaseLogsGetService.getFilterLogs(testLogSearchRequest, pageable));
    }


}
