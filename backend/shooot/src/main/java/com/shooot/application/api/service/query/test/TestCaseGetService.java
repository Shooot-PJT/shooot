package com.shooot.application.api.service.query.test;

import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
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

    @Transactional(readOnly = true)
    public List<ApiTestCaseListView> getList(Integer apiId){

        return apiTestCaseRepository.findApiTestCasesByApiId(apiId).stream()
                .map(ApiTestCaseListView::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ApiTestCaseView get(Integer testcaseId){
        Optional<ApiTestCase> apiTestCase = apiTestCaseRepository.findApiTestCaseById(testcaseId);
        ApiTestCaseRequest apiTestCaseRequest = apiTestCaseRequestRepository.findLatestByApiTestCaseId(testcaseId)
                .orElseThrow();



        return ;

    }

    private


}
