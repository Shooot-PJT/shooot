package com.shooot.application.project.ui.dto;

import com.shooot.application.project.domain.ProjectParticipant;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectParticipantMember {
    private Integer participantId;
    private String nickname;

    public static ProjectParticipantMember from(ProjectParticipant projectParticipant){
        return ProjectParticipantMember.builder()
                .participantId(projectParticipant.getId())
                .nickname(projectParticipant.getUser().getNickname())
                .build();
    }
}
