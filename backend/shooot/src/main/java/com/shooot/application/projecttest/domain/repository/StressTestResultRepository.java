package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.StressTestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StressTestResultRepository extends JpaRepository<StressTestResult, Long> {

}
