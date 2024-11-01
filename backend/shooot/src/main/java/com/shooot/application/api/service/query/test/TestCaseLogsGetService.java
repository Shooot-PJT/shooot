package com.shooot.application.api.service.query.test;

import com.shooot.application.api.domain.repository.ApiTestLogRepository;
import com.shooot.application.api.service.command.test.dto.TestLogSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TestCaseLogsGetService {
    private final ApiTestLogRepository apiTestLogRepository;

    public void getFilterLogs(TestLogSearchRequest testLogSearchRequest){
        r
    }
}
