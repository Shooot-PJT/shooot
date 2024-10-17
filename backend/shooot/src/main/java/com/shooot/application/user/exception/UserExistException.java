package com.shooot.application.user.exception;

import com.shooot.application.common.exception.CustomException;

public class UserExistException extends CustomException {
    public UserExistException() {
        super(UserExceptionConstants.USER_EXIST_EXCEPTION);
    }
}
