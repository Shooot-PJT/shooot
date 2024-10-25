package com.shooot.application.project.service.command;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.DuplicateEnglishNameException;
import com.shooot.application.project.service.dto.ProjectRegisterRequest;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ProjectRegisterService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectParticipantRepository projectParticipantRepository;

    @Transactional
    public void projectRegister(
        ProjectRegisterRequest request,
        MultipartFile file,
        Integer userId
    ) {

        if (projectRepository.existsByEnglishName(request.getEnglishName())) {
            throw new DuplicateEnglishNameException();
        }

        // TODO: S3 이미지 업로드
        String logoImageUrl = null;

        Project project = Project.builder()
            .name(request.getName())
            .englishName(request.getEnglishName())
            .logoImageUrl(logoImageUrl)
            .memo(request.getMemo())
            .build();
        projectRepository.save(project);

        User user = userRepository.findById(userId).orElseThrow();

        ProjectParticipant projectParticipant = ProjectParticipant.builder()
            .user(user)
            .project(project)
            .isOwner(true)
            .build();
        projectParticipantRepository.save(projectParticipant);
    }
}
