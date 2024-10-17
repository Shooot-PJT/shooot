package com.shooot.application.user.exception;

import com.shooot.application.common.exception.CustomException;

public class EmailVerificationNotFoundException extends CustomException {
    public EmailVerificationNotFoundException() {
        super(UserExceptionConstants.EMAIL_VERIFICATION_NOT_FOUND);
    }
}
