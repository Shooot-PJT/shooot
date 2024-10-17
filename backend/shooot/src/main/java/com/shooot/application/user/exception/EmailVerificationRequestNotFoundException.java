package com.shooot.application.user.exception;

import com.shooot.application.common.exception.CustomException;

public class EmailVerificationRequestNotFoundException extends CustomException {
    public EmailVerificationRequestNotFoundException() {
        super(UserExceptionConstants.EMAIL_VERIFICATION_REQUEST_NOT_FOUND);
    }
}
