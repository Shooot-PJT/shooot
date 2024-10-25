package com.shooot.application.project.service.command;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.service.dto.ProjectModifyRequest;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
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

    @Transactional
    public void projectModify(
        ProjectModifyRequest request,
        MultipartFile file,
        Integer projectId,
        Integer userId
    ) {
        Project project = projectRepository.findById(projectId).orElseThrow();

        User currentUser = userRepository.findById(userId).orElseThrow();

        ProjectParticipant projectParticipant = projectParticipantRepository.findByUserAndProject(
            currentUser, project).orElseThrow();

        if (!projectParticipant.getIsOwner()) {
            // TODO
        }

        // TODO: 검증 부분 분리

        // TODO: S3 이미지
        String logoImageUrl = null;

        project.changeName(request.getName());
        project.changeLogoImageUrl(logoImageUrl);
        project.changeMemo(request.getMemo());
    }

    public void projectModify(
        ProjectModifyRequest request,
        Integer projectId,
        Integer userId
    ) {
        Project project = projectRepository.findById(projectId).orElseThrow();

        User currentUser = userRepository.findById(userId).orElseThrow();

        ProjectParticipant projectParticipant = projectParticipantRepository.findByUserAndProject(
            currentUser, project).orElseThrow();

        if (!projectParticipant.getIsOwner()) {
            // TODO
        }

        // TODO: 검증 부분 분리

        project.changeName(request.getName());
        project.changeMemo(request.getMemo());
    }
}
