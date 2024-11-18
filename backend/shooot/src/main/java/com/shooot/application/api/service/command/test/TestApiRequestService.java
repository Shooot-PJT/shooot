package com.shooot.application.api.service.command.test;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestStatusType;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
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
    private final ApiRepository apiRepository;

    public List<TestCaseResponseView> allTestcaseOfApi(Integer apiId, Integer userId){
        List<ApiTestCase> apiTestCaseList = apiTestCaseRepository.findApiTestCasesByApiId(apiId);
        List<TestCaseResponseView> responseList = new ArrayList<>();
        boolean pass = true;

        if(!apiTestCaseList.isEmpty()){
            for (ApiTestCase apiTestCase : apiTestCaseList) {
                TestCaseResponseView testCaseResponseView = testCaseRequestService.testCaseResponse(apiTestCase.getId(), userId);

                responseList.add(testCaseResponseView);

                if("FAIL".equals(testCaseResponseView.getTestResult())){
                    pass = false;
                }
//                responseList.add(testCaseRequestService.testCaseResponse(apiTestCase.getId(), userId));
            }

            Api api = apiRepository.findById(apiId)
                    .orElseThrow(ApiNotFoundException::new);

            if (pass) {
                api.update(ApiTestStatusType.SUCCESS);
            } else {
                api.update(ApiTestStatusType.FAIL);
            }
        }

        return responseList;
    }


}
