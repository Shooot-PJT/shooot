package com.shooot.application.user.service.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    private String email;
    private String nickname;
    private String password;
}
