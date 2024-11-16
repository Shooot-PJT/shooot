package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectNotTerminatedException extends CustomException {

    public ProjectNotTerminatedException() {
        super(ProjectExceptionConstants.PROJECT_NOT_TERMINATED);
    }
}
