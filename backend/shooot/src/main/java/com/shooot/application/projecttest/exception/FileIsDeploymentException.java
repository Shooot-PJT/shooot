package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class FileIsDeploymentException extends CustomException {
    public FileIsDeploymentException() {
        super(ProjectBuildExceptionConstants.FILE_IS_DEPLOYMENT);
    }
}
