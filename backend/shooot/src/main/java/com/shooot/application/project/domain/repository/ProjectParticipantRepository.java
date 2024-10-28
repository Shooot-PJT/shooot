package com.shooot.application.project.domain.repository;

import com.shooot.application.project.domain.ProjectParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectParticipantRepository extends JpaRepository<ProjectParticipant, Integer> {
    @Query("SELECT pp FROM ProjectParticipant pp WHERE pp.project.id = :projectId AND pp.user.id = :userId")
    ProjectParticipant findByProjectIdAndUserId(
            @Param("projectId") Integer projectId,
            @Param("userId") Integer userId
    );
}
