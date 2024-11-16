package com.shooot.application.project.service.command;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.service.command.api.ApiDeleteService;
import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.project.exception.ProjectPermissionDeniedException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectRemoveService {

    private final ProjectParticipantRepository projectParticipantRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ApiRepository apiRepository;
    private final DomainRepository domainRepository;
    private final ApiDeleteService apiDeleteService;

    @Transactional
    public void projectRemove(Integer userId, Integer projectId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Project project = projectRepository.findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);
        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectAndUser(
            project, user).orElseThrow(ProjectParticipantNotFoundException::new);

        if (!projectParticipant.getIsOwner()) {
            throw new ProjectPermissionDeniedException();
        }

        List<Domain> domains = domainRepository.findByProjectIdAndNotDeleted(
            projectId);
        domains.forEach(SoftDeleteEntity::delete);

        List<Api> apis = apiRepository.findAllByDomain_Project_Id(projectId);
        apis.forEach(a -> apiDeleteService.deleteApi(a.getId()));

        List<ProjectParticipant> projectParticipants = projectParticipantRepository.findByProject(
            project);
        projectParticipants.forEach(SoftDeleteEntity::delete);

        project.delete();
    }
}
