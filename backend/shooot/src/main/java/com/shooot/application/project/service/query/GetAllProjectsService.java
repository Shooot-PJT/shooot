package com.shooot.application.project.service.query;

import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.ui.dto.ProjectResponse;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Service
public class GetAllProjectsService {

    @Value("${url.project.logo}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final ProjectParticipantRepository projectParticipantRepository;

    @Transactional
    public List<ProjectResponse> getAllProjects(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<ProjectParticipant> participants = projectParticipantRepository.findByUser(user);
        return participants.stream()
            .map(
                participant -> ProjectResponse.builder()
                    .projectId(participant.getProject().getId())
                    .name(participant.getProject().getName())
                    .englishName(participant.getProject().getEnglishName())
                    .logoImageUrl(
                        UriComponentsBuilder.fromHttpUrl(baseUrl)
                            .build(participant.getProject().getId())
                            .toString()
                    )
                    .memo(participant.getProject().getMemo())
                    .userCount(
                        projectParticipantRepository.findByProject(participant.getProject()).size())
                    .isOwner(participant.getIsOwner())
                    .build()
            )
            .toList();
    }
}
