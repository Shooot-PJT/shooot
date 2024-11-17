package com.shooot.dockermanager.domain.projecttest.repository;

import com.shooot.dockermanager.domain.projecttest.StressTestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StressTestResultRepository extends JpaRepository<StressTestResult, Long> {

}
