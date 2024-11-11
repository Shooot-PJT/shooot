package com.shooot.dockermanager.domain.projecttest.repository;

import com.shooot.dockermanager.domain.projecttest.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query("SELECT DISTINCT p FROM Project p JOIN ProjectBuild pb ON pb.project = p AND pb.id = :projectJarFileId ")
    Optional<Project> findByProjectJarFileId(@Param("projectJarFileId")Integer projectJarFileId);
}
