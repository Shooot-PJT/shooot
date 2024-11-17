package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.StressTestLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StressTestLogRepository extends JpaRepository<StressTestLog, Long> {

}
