package com.shooot.application.api.service.query.testcase;

import com.shooot.application.api.domain.repository.ApiTestLogQueryRepository;
import com.shooot.application.api.service.command.testcase.dto.TestLogSearchRequest;
import com.shooot.application.api.service.query.testcase.dto.ApiTestLogInfiniteResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TestCaseLogsGetService {
    private final ApiTestLogQueryRepository apiTestLogQueryRepository;

    public Slice<ApiTestLogInfiniteResponse> getFilterLogs(TestLogSearchRequest testLogSearchRequest, Pageable pageable){
        return apiTestLogQueryRepository.getTestLogs(testLogSearchRequest, pageable);
    }

}
