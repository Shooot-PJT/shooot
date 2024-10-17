package com.shooot.application.user.exception;

import com.shooot.application.common.exception.CustomException;

public class UserNotFoundException extends CustomException {
    public UserNotFoundException() {
        super(UserExceptionConstants.USER_NOT_FOUND_EXCEPTION);
    }
}
