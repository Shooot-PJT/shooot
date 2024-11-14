package com.shooot.application.api.service.query.testcase;

import com.shooot.application.api.domain.repository.ApiTestLogQueryRepository;
import com.shooot.application.api.service.command.testcase.dto.TestLogSearchRequest;
import com.shooot.application.api.service.query.testcase.dto.ApiTestLogInfiniteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestCaseLogsGetService {
    private final ApiTestLogQueryRepository apiTestLogQueryRepository;

    public Slice<ApiTestLogInfiniteResponse> getFilterLogs(TestLogSearchRequest testLogSearchRequest, Pageable pageable){
        return apiTestLogQueryRepository.getTestLogs(testLogSearchRequest, pageable);
    }
}
