package com.shooot.application.project.domain.repository;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectParticipantRepository extends JpaRepository<ProjectParticipant, Integer> {

    Optional<ProjectParticipant> findByProjectAndUser(Project project, User user);

    List<ProjectParticipant> findByProject(Project project);

    Optional<ProjectParticipant> findByProjectAndIsOwner(Project project, boolean isOwner);
}
