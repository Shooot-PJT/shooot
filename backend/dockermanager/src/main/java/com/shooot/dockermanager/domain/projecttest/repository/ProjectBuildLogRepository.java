package com.shooot.dockermanager.domain.projecttest.repository;

import com.shooot.dockermanager.domain.projecttest.ProjectBuildLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProjectBuildLogRepository extends JpaRepository<ProjectBuildLog, UUID> {
    Optional<ProjectBuildLog> findByProjectBuild_Id(Integer projectBuildId);
}
