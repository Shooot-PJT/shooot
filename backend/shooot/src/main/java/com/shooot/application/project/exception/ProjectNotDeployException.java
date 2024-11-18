package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectNotDeployException extends CustomException {
    public ProjectNotDeployException(){
        super(ProjectExceptionConstants.PROJECT_NOT_DEPLOY_EXCEPTION);
    }
}
