package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectEnglishNameNotValidException extends CustomException {

    public ProjectEnglishNameNotValidException() {
        super(ProjectExceptionConstants.PROJECT_ENGLISH_NAME_NOT_VALID);
    }
}
