package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectNotFoundException extends CustomException {

    public ProjectNotFoundException() {
        super(ProjectExceptionConstants.PROJECT_NOT_FOUND);
    }
}
