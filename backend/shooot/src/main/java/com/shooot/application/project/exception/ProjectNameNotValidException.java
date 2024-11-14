package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectNameNotValidException extends CustomException {

    public ProjectNameNotValidException() {
        super(ProjectExceptionConstants.PROJECT_NAME_NOT_VALID);
    }
}
