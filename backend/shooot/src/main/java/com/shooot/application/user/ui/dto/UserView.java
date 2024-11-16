package com.shooot.application.user.ui.dto;

import com.shooot.application.user.domain.ProfileColor;
import com.shooot.application.user.domain.User;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserView {
    private String email;
    private String nickname;
    private ProfileColor color;

    public static UserView from(User user) {
        return UserView.builder()
                .email(user.getUsername())
                .nickname(user.getNickname())
                .color(user.getColor())
                .build();
    }
}
