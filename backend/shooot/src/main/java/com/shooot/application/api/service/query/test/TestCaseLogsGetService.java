package com.shooot.application.api.service.query.test;

import com.shooot.application.api.domain.ApiTestLog;
import com.shooot.application.api.domain.repository.ApiTestLogQueryRepository;
import com.shooot.application.api.domain.repository.ApiTestLogRepository;
import com.shooot.application.api.service.command.test.dto.TestLogSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestCaseLogsGetService {
    private final ApiTestLogQueryRepository apiTestLogQueryRepository;

    public Slice<ApiTestLog> getFilterLogs(TestLogSearchRequest testLogSearchRequest, Pageable pageable){
        return apiTestLogQueryRepository.getTestLogs(testLogSearchRequest, pageable);
    }
}
