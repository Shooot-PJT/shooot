package com.shooot.application.project.ui.dto;

import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.user.domain.ProfileColor;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectParticipantMember {
    private Integer participantId;
    private String nickname;
    private ProfileColor color;

    public static ProjectParticipantMember from(ProjectParticipant projectParticipant){
        return ProjectParticipantMember.builder()
                .participantId(projectParticipant.getId())
                .nickname(projectParticipant.getUser().getNickname())
                .color(projectParticipant.getUser().getColor())
                .build();
    }
}
