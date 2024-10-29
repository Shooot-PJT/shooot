package com.shooot.application.project.domain.repository;

import com.shooot.application.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    boolean existsByEnglishName(String englishName);

}
