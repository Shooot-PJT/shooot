package com.shooot.application.project.service.query;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.project.ui.dto.ProjectResponse;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Service
public class GetProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectParticipantRepository projectParticipantRepository;

    @Value("${url.project.logo}")
    private String baseUrl;

    public ProjectResponse getProject(Integer projectId, Integer userId) {
        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);
        User user = userRepository
            .findById(userId)
            .orElseThrow(UserNotFoundException::new);
        ProjectParticipant projectParticipant = projectParticipantRepository
            .findByProjectAndUser(project, user)
            .orElseThrow(ProjectParticipantNotFoundException::new);
        String logoImageUrl = UriComponentsBuilder.fromHttpUrl(baseUrl)
            .build(projectId)
            .toString();
        Integer userCount = projectParticipantRepository.findByProject(project).size();

        return ProjectResponse.builder()
            .projectId(projectId)
            .name(project.getName())
            .englishName(project.getEnglishName())
            .logoImageUrl(logoImageUrl)
            .memo(project.getMemo())
            .userCount(userCount)
            .isOwner(projectParticipant.getIsOwner())
            .build();
    }
}
