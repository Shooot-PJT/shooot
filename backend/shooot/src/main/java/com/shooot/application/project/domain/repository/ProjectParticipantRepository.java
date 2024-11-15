package com.shooot.application.project.domain.repository;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectParticipantRepository extends JpaRepository<ProjectParticipant, Integer> {

    Optional<ProjectParticipant> findByProjectAndUser(Project project, User user);

    List<ProjectParticipant> findByProject(Project project);

    Optional<ProjectParticipant> findByProjectAndIsOwner(Project project, boolean isOwner);

    @Query("SELECT pp FROM ProjectParticipant pp WHERE pp.project.id = :projectId AND pp.user.id = :userId")
    ProjectParticipant findByProjectIdAndUserId(
        @Param("projectId") Integer projectId,
        @Param("userId") Integer userId
    );

    List<ProjectParticipant> findByUser(User user);

    @Query("SELECT pp FROM ProjectParticipant pp WHERE pp.project.id = :projectId")
    List<ProjectParticipant> findByProjectIdMembers(@Param("projectId") Integer projectId);
}
