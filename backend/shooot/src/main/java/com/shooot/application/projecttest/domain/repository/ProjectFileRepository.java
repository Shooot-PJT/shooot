package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.ProjectBuildLog;
import com.shooot.application.projecttest.domain.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProjectFileRepository extends JpaRepository<ProjectFile, UUID> {

}
