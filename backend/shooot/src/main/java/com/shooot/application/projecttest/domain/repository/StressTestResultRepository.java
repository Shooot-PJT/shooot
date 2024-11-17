package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.StressTestLog;
import com.shooot.application.projecttest.domain.StressTestResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StressTestResultRepository extends JpaRepository<StressTestResult, Long> {

    List<StressTestResult> findByStressTestLog(StressTestLog stressTestLog);
}
