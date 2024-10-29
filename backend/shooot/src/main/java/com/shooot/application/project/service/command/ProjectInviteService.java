package com.shooot.application.project.service.command;

import com.shooot.application.common.events.Events;
import com.shooot.application.common.infra.MailSenderRequest;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectInvitation;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectInvitationRepository;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Service
public class ProjectInviteService {

    private final ProjectParticipantRepository projectParticipantRepository;
    @Value("${url.project.accept-invitation}")
    private String acceptInvitationUrl;

    private final ProjectInvitationRepository projectInvitationRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public void invite(Integer projectId, Integer userId) {

        UUID uuid = UUID.randomUUID();
        ProjectInvitation projectInvitation = ProjectInvitation.builder()
            .id(uuid)
            .projectId(projectId)
            .userId(userId)
            .build();
        projectInvitationRepository.save(projectInvitation);

        User user = userRepository
            .findById(userId)
            .orElseThrow(UserNotFoundException::new);

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);

        ProjectParticipant projectOwner = projectParticipantRepository
            .findByProjectAndIsOwner(project, true)
            .orElseThrow(ProjectParticipantNotFoundException::new);

        String url = UriComponentsBuilder.fromHttpUrl(acceptInvitationUrl)
            .build(projectInvitation.getId())
            .toString();

        Events.raise(
            MailSenderRequest.builder()
                .toEmail(user.getUsername())
                .subject("[Shooot] 팀원 초대 안내")
                .variables(
                    Map.of(
                        "inviterName", projectOwner.getUser().getNickname(),
                        "teamName", project.getName(),
                        "acceptLink", url)
                )
                .templatePath("invitation-email-template")
                .build()
        );
    }
}
