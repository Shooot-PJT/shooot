package com.shooot.application.api.service.command.test;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.domain.ApiTestCaseRequestType;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ApiTestCaseCreateService {
    private final ApiRepository apiRepository;
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;

    @Transactional
    public ApiTestCaseView create(Integer apiId, Map<String, Object> request){
        ApiTestCase apiTestCase = createApiTestCase(apiId, request);
        ApiTestCaseRequest apiTestCaseRequest = createApiTestCaseRequest(apiTestCase, request);

        return ApiTestCaseView.from(apiTestCase, apiTestCaseRequest);
    }

    private ApiTestCase createApiTestCase(Integer apiId, Map<String, Object> request){
        Api api = apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);

        ApiTestCase apiTestCase = ApiTestCase.builder()
                .api(api)
                .title((String)request.get("title"))
                .httpStatus(HttpStatus.valueOf((Integer) request.get("expectHttpStatus")))
                .build();

        return apiTestCaseRepository.save(apiTestCase);
    }

    private ApiTestCaseRequest createApiTestCaseRequest(ApiTestCase apiTestCase, Map<String, Object> request){

        ApiTestCaseRequest apiTestCaseRequest = ApiTestCaseRequest.builder()
                .apiTestCase(apiTestCase)
                .type(request.get("type").equals("json") ? ApiTestCaseRequestType.JSON : ApiTestCaseRequestType.MULTIPART)
                .content((Map<String, Object>) request.get("content"))
                .build();

        return apiTestCaseRequestRepository.save(apiTestCaseRequest);
    }

}
