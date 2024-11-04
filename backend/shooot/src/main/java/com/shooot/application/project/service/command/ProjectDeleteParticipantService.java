package com.shooot.application.project.service.command;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectDeleteParticipantService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectParticipantRepository projectParticipantRepository;

    @Transactional
    public void deleteParticipant(Integer projectId, Integer userId) {

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);

        User user = userRepository
            .findById(userId)
            .orElseThrow(UserNotFoundException::new);

        ProjectParticipant projectParticipant = projectParticipantRepository
            .findByProjectAndUser(project, user)
            .orElseThrow(ProjectParticipantNotFoundException::new);

        projectParticipantRepository.delete(projectParticipant);
    }

}
