package com.shooot.application.project.service.command;

import com.shooot.application.common.events.Events;
import com.shooot.application.common.infra.MailSenderRequest;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectInvitation;
import com.shooot.application.project.domain.repository.ProjectInvitationRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectInviteService {

    private final ProjectInvitationRepository projectInvitationRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public void invite(Integer projectId, Integer userId) {

        UUID uuid = UUID.randomUUID();

        ProjectInvitation projectInvitation = ProjectInvitation.builder()
            .id(uuid)
            .projectId(projectId)
            .userId(userId)
            .build();
        projectInvitationRepository.save(projectInvitation);

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        // TODO: Exception 수정
        Project project = projectRepository.findById(projectId).orElseThrow();
        // TODO: 팀원 수락 API
        String url = projectInvitation.getId().toString();

        // TODO: inviterName 팀장으로 변경
        Events.raise(MailSenderRequest.builder()
            .toEmail(user.getUsername())
            .subject("[Shooot] 팀원 초대 안내")
            .variables(Map.of(
                "inviterName", user.getNickname(),
                "teamName", project.getName(),
                "acceptLink", url))
            .templatePath("invitation-email-template")
            .build()
        );
    }
}
