package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.ProjectBuildLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectBuildLogRepository extends JpaRepository<ProjectBuildLog, Integer> {

    Optional<ProjectBuildLog> findByProjectBuild_Id(Integer projectBuildId);
}
