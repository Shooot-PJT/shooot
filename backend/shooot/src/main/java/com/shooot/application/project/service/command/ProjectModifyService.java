package com.shooot.application.project.service.command;

import com.shooot.application.common.infra.storage.domain.File;
import com.shooot.application.common.infra.storage.service.FileStorageService;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectPermissionDeniedException;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.project.service.dto.ProjectModifyRequest;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ProjectModifyService {

    private final ProjectRepository projectRepository;
    private final ProjectParticipantRepository projectParticipantRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public void projectModify(
        ProjectModifyRequest request,
        MultipartFile file,
        Integer projectId,
        Integer userId
    ) {

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);

        User user = userRepository
            .findById(userId)
            .orElseThrow(UserNotFoundException::new);

        ProjectParticipant projectParticipant = projectParticipantRepository
            .findByProjectAndUser(project, user)
            .orElseThrow(ProjectParticipantNotFoundException::new);

        if (!projectParticipant.getIsOwner()) {
            throw new ProjectPermissionDeniedException();
        }

        File logoImageFile = fileStorageService.uploadFile(file);

        project.changeName(request.getName());
        project.changeMemo(request.getMemo());
        project.changeLogoImageFile(logoImageFile);
    }

    @Transactional
    public void projectModify(
        ProjectModifyRequest request,
        Integer projectId,
        Integer userId
    ) {

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);

        User user = userRepository
            .findById(userId)
            .orElseThrow(UserNotFoundException::new);

        ProjectParticipant projectParticipant = projectParticipantRepository
            .findByProjectAndUser(project, user)
            .orElseThrow(ProjectParticipantNotFoundException::new);

        if (!projectParticipant.getIsOwner()) {
            throw new ProjectPermissionDeniedException();
        }

        project.changeName(request.getName());
        project.changeMemo(request.getMemo());
    }
}
