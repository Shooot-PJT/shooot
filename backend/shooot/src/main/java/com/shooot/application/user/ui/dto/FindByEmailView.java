package com.shooot.application.user.ui.dto;

import com.shooot.application.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FindByEmailView {

    private Integer userId;
    private String email;
    private String nickname;

    public static FindByEmailView from(User user) {
        return FindByEmailView.builder()
            .userId(user.getId())
            .email(user.getUsername())
            .nickname(user.getNickname())
            .build();
    }
}
