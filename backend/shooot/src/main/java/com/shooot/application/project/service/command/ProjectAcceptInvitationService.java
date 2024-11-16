package com.shooot.application.project.service.command;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectInvitation;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectInvitationRepository;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.DuplicateProjectParticipantException;
import com.shooot.application.project.exception.ProjectInvitationNotFoundException;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectAcceptInvitationService {

    private final ProjectInvitationRepository projectInvitationRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectParticipantRepository projectParticipantRepository;

    @Transactional
    public void acceptInvitation(UUID projectInvitationId) {

        ProjectInvitation projectInvitation = projectInvitationRepository
            .findById(projectInvitationId)
            .orElseThrow(ProjectInvitationNotFoundException::new);

        Project project = projectRepository
            .findById(projectInvitation.getProjectId())
            .orElseThrow(ProjectNotFoundException::new);

        User user = userRepository
            .findById(projectInvitation.getUserId())
            .orElseThrow(UserNotFoundException::new);

        if (projectParticipantRepository.findByProjectAndUser(project, user).isPresent()) {
            throw new DuplicateProjectParticipantException();
        }

        ProjectParticipant projectParticipant = ProjectParticipant.builder()
            .project(project)
            .user(user)
            .isOwner(false)
            .build();

        projectParticipantRepository.save(projectParticipant);
        projectInvitationRepository.delete(projectInvitation);
    }
}
