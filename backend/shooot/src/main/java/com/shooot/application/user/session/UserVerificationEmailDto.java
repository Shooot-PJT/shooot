package com.shooot.application.user.session;

import com.shooot.application.user.service.dto.EmailVerificationRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserVerificationEmailDto implements Serializable {
    @Serial
    private static final long serialVersionUID = -2003632380209941855L;

    private String email;
    private String verificationNumber;
    private Boolean isValid;


    public boolean verify(EmailVerificationRequest dto) {
        if(Objects.equals(verificationNumber, dto.getNumber())) {
            isValid = true;
            return true;
        }
        isValid = false;
        return false;
    }
}
