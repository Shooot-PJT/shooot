package com.shooot.application.api.service.command.test;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.ui.dto.TestCaseResponseView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TestApiRequestService {
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final TestCaseRequestService testCaseRequestService;

    public List<TestCaseResponseView> allTestcaseOfApi(Integer apiId, Integer userId){
        List<ApiTestCase> apiTestCaseList = apiTestCaseRepository.findApiTestCasesByApiId(apiId);

        List<TestCaseResponseView> responseList = new ArrayList<>();
        if(!apiTestCaseList.isEmpty()){
            for (ApiTestCase apiTestCase : apiTestCaseList) {
                responseList.add(testCaseRequestService.testCaseResponse(apiTestCase.getId(), userId));
            }
        }

        return responseList;
    }


}
