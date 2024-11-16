package com.shooot.application.api.service.query.testcase;

import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.domain.repository.ApiTestLogRepository;
import com.shooot.application.api.ui.dto.ApiTestCaseListView;
import com.shooot.application.api.ui.dto.TestCaseView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public TestCaseView get(Integer testcaseId){
        PageRequest pageRequest = PageRequest.of(0, 1);
        List<ApiTestCaseRequest> apiTestCaseRequests = apiTestCaseRequestRepository.findLatestByTestCaseId(testcaseId, pageRequest);

        if (!apiTestCaseRequests.isEmpty()) {
            ApiTestCaseRequest latestApiTestCaseRequest = apiTestCaseRequests.get(0);
            ApiTestCase apiTestCase = apiTestCaseRepository.findById(latestApiTestCaseRequest.getId())
                    .orElseThrow();

            return TestCaseView.builder()
                    .id(latestApiTestCaseRequest.getApiTestCase().getId())
                    .testCaseRequestId(latestApiTestCaseRequest.getId())
                    .title(apiTestCase.getTitle())
                    .testStatus(apiTestCase.getTestCaseStatus().toString())
                    .httpStatusCode(apiTestCase.getHttpStatus().value())
                    .createdAt(apiTestCase.getCreatedAt())
                    .modifiedAt(apiTestCase.getModifiedAt())
                    .type(latestApiTestCaseRequest.getType().name())
                    .content(latestApiTestCaseRequest.getContent())
                    .build();
        }

        return null;

    }


}
