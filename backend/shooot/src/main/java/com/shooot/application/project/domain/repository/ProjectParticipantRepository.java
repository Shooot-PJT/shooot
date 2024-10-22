package com.shooot.application.project.domain.repository;

import com.shooot.application.project.domain.ProjectParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectParticipantRepository extends JpaRepository<ProjectParticipant, Integer> {
}
