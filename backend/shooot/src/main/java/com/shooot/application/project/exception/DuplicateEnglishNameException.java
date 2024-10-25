package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class DuplicateEnglishNameException extends CustomException {

    public DuplicateEnglishNameException() {
        super(ProjectExceptionConstants.DUPLICATE_ENGLISH_NAME_EXCEPTION);
    }
}
