package com.shooot.application.project.ui.dto;

import com.shooot.application.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FindParticipantsResponse {

    private Integer userId;
    private String email;
    private String nickname;

    public static FindParticipantsResponse from(User user) {
        return FindParticipantsResponse.builder()
            .userId(user.getId())
            .email(user.getUsername())
            .nickname(user.getNickname())
            .build();
    }
}
