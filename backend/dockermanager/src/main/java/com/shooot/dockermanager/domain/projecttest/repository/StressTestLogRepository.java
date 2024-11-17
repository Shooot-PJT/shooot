package com.shooot.dockermanager.domain.projecttest.repository;

import com.shooot.dockermanager.domain.projecttest.StressTestLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StressTestLogRepository extends JpaRepository<StressTestLog, Long> {

}
