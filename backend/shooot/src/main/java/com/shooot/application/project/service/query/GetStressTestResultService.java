package com.shooot.application.project.service.query;

import com.shooot.application.project.ui.dto.GetStressTestResultResponse;
import com.shooot.application.projecttest.domain.StressTestLog;
import com.shooot.application.projecttest.domain.StressTestResult;
import com.shooot.application.projecttest.domain.repository.StressTestLogRepository;
import com.shooot.application.projecttest.domain.repository.StressTestResultRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class GetStressTestResultService {

    private final StressTestResultRepository stressTestResultRepository;
    private final StressTestLogRepository stressTestLogRepository;

    @Transactional(readOnly = true)
    public List<GetStressTestResultResponse> getStressTestResults(Long stressTestLogId) {
        StressTestLog stressTestLog = stressTestLogRepository.findById(stressTestLogId)
            .orElseThrow();
        List<StressTestResult> stressTestResults = stressTestResultRepository.findByStressTestLog(
            stressTestLog);
        return stressTestResults.stream().map(r -> GetStressTestResultResponse.builder()
            .httpMethod(r.getHttpMethod())
            .url(r.getUrl())
            .duration(r.getDuration())
            .vUser(r.getVUser())
            .testMethod(r.getTestMethod())
            .avgCpu(r.getAvgCpu())
            .maxCpu(r.getMaxCpu())
            .minCpu(r.getMinCpu())
            .avgMemory(r.getAvgMemory())
            .maxMemory(r.getMaxMemory())
            .minMemory(r.getMinMemory())
            .avgDisk(r.getAvgDisk())
            .maxDisk(r.getMaxDisk())
            .minDisk(r.getMinDisk())
            .avgNetwork(r.getAvgNetwork())
            .maxNetwork(r.getMaxNetwork())
            .minNetwork(r.getMinNetwork())
            .build()).toList();
    }
}
