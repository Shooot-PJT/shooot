package com.shooot.application.api.service.command.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiDeleteService {
    private final ApiRepository apiRepository;
    private final ApiTestCaseRepository apiTestCaseRepository;

    @Transactional
    public void deleteApi(Integer apiId){
        Api api = apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);

        List<ApiTestCase> apiTestCases = apiTestCaseRepository.findApiTestCasesByApiId(apiId);
        apiTestCases.stream().forEach(ApiTestCase::delete);

        api.delete();
    }
}
