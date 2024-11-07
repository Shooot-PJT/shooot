package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectPermissionDeniedException extends CustomException {
    public ProjectPermissionDeniedException(){
        super(ProjectExceptionConstants.PROJECT_PERMISSION_DENIED);
    }
}
