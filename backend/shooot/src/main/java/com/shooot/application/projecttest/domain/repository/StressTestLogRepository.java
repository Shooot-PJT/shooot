package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.StressTestLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StressTestLogRepository extends JpaRepository<StressTestLog, Long> {

    List<StressTestLog> findByProjectBuild(ProjectBuild projectBuild);
}
