package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class FileIsNotDeploymentException extends CustomException {
    public FileIsNotDeploymentException() {
        super(ProjectBuildExceptionConstants.FILE_IS_NOT_DEPLOYMENT);
    }
}
