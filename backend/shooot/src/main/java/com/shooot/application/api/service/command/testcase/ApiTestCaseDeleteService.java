package com.shooot.application.api.service.command.testcase;

import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.exception.testcase.TestCaseNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApiTestCaseDeleteService {
    private final ApiTestCaseRepository apiTestCaseRepository;

    @Transactional
    public void delete(Integer testcaseId){
        ApiTestCase apiTestCase = apiTestCaseRepository.findById(testcaseId)
                .orElseThrow(TestCaseNotFoundException::new);

        apiTestCase.delete();
    }

}
