package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectBuildNotFoundException extends CustomException {
    public ProjectBuildNotFoundException() {
        super(ProjectBuildExceptionConstants.PROJECT_BUILD_NOT_FOUND_EXCEPTION);
    }
}
