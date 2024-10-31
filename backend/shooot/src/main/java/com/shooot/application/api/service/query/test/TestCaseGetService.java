package com.shooot.application.api.service.query.test;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.domain.ApiTestLog;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.domain.repository.ApiTestLogRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.testcase.TestCaseNotFoundException;
import com.shooot.application.api.exception.testcase.TestCaseRequestNotFoundException;
import com.shooot.application.api.ui.dto.ApiDetailView;
import com.shooot.application.api.ui.dto.ApiTestCaseListView;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import com.shooot.application.api.ui.dto.ApiView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestCaseGetService {
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;
    private final ApiTestLogRepository apiTestLogRepository;

    @Transactional(readOnly = true)
    public List<ApiTestCaseListView> getList(Integer apiId){

        return apiTestCaseRepository.findApiTestCasesByApiId(apiId).stream()
                .map(ApiTestCaseListView::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ApiDetailView get(Integer testcaseId){
        return apiTestCaseRepository.findApiDetailByTestCaseId(testcaseId)
                .orElseThrow(ApiNotFoundException::new);
    }


}
