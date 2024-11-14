package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectFileRepository extends JpaRepository<ProjectFile, Integer> {

}
