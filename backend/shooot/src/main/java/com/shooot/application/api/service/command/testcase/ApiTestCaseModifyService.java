package com.shooot.application.api.service.command.testcase;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.domain.ApiTestCaseRequestType;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.testcase.TestCaseNotFoundException;
import com.shooot.application.api.service.command.testcase.dto.ApiTestCaseModifyRequest;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiTestCaseModifyService {
    private final ApiRepository apiRepository;
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;
    private final ApiTestCaseCreateService apiTestCaseCreateService;

    @Transactional
    public ApiTestCaseView modify(Integer testcaseId, Map<String, Object> request){
        ApiTestCase apiTestCase = modifyApiTestCase(testcaseId, request);
//        ApiTestCaseRequest apiTestCaseRequest = modifyApiTestCaseRequest(apiTestCase, request);
        ApiTestCaseRequest apiTestCaseRequest = apiTestCaseCreateService.createApiTestCaseRequest(apiTestCase, request);

        Api api = apiRepository.findById(apiTestCase.getApi().getId())
                .orElseThrow(ApiNotFoundException::new);
        api.testCaseUpdate();

        return ApiTestCaseView.from(apiTestCase, apiTestCaseRequest);
    }

    private ApiTestCase modifyApiTestCase(Integer testcaseId, Map<String,Object> request){
        ApiTestCase apiTestCase = apiTestCaseRepository.findApiTestCaseById(testcaseId)
                .orElseThrow(TestCaseNotFoundException::new);

        ApiTestCaseModifyRequest apiTestCaseModifyRequest = ApiTestCaseModifyRequest
                .builder()
                .title((String) request.get("title"))
                .httpStatusCode((Integer) request.get("httpStatusCode"))
                .build();

        apiTestCase.update(apiTestCaseModifyRequest);

        return apiTestCase;
    }

    private ApiTestCaseRequest modifyApiTestCaseRequest(ApiTestCase apiTestCase, Map<String,Object> request){
        log.info("content get = {}", request.get("content"));

        ApiTestCaseRequestType type = ApiTestCaseRequestType.valueOf(request.get("type").toString().toUpperCase());

        ApiTestCaseRequest apiTestCaseRequest = ApiTestCaseRequest.builder()
                .apiTestCase(apiTestCase)
//                .type(Objects.equals(request.get("type"), "JSON") ? ApiTestCaseRequestType.JSON : ApiTestCaseRequestType.MULTIPART)
                .type(type)
                .content((Map<String, Object>) request.get("content"))
                .build();
        // TODO : s3저장하는 로직 작성
        return apiTestCaseRequestRepository.save(apiTestCaseRequest);
    }

}
