package com.shooot.application.project.ui.dto;

import com.shooot.application.user.domain.ProfileColor;
import com.shooot.application.user.domain.User;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FindParticipantsResponse {

    private Integer userId;
    private String email;
    private String nickname;
    private ProfileColor color;

    public static FindParticipantsResponse from(User user) {
        return FindParticipantsResponse.builder()
                .userId(user.getId())
                .email(user.getUsername())
                .nickname(user.getNickname())
                .color(user.getColor())
                .build();
    }
}
