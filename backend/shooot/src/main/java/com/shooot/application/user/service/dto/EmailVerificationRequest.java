package com.shooot.application.user.service.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerificationRequest {
    private String email;
    private String number;
}
