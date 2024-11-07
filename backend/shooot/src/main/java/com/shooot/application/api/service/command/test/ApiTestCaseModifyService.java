package com.shooot.application.api.service.command.test;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.domain.ApiTestCaseRequestType;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.testcase.TestCaseNotFoundException;
import com.shooot.application.api.service.command.test.dto.ApiTestCaseModifyRequest;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiTestCaseModifyService {
    private final ApiRepository apiRepository;
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;

    @Transactional
    public ApiTestCaseView modify(Integer testcaseId, Map<String, Object> request){
        ApiTestCase apiTestCase = modifyApiTestCase(testcaseId, request);
        ApiTestCaseRequest apiTestCaseRequest = modifyApiTestCaseRequest(apiTestCase, request);

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
                .expectHttpStatus((Integer) request.get("expectHttpStatus"))
                .build();

        apiTestCase.update(apiTestCaseModifyRequest);

        return apiTestCase;
    }

    private ApiTestCaseRequest modifyApiTestCaseRequest(ApiTestCase apiTestCase, Map<String,Object> request){
        log.info("content get = {}", request.get("content"));
        ApiTestCaseRequest apiTestCaseRequest = ApiTestCaseRequest.builder()
                .apiTestCase(apiTestCase)
                .type(Objects.equals(request.get("type"), "JSON") ? ApiTestCaseRequestType.JSON : ApiTestCaseRequestType.MULTIPART)
                .content((Map<String, Object>) request.get("content"))
                .build();

        return apiTestCaseRequestRepository.save(apiTestCaseRequest);
    }

}
