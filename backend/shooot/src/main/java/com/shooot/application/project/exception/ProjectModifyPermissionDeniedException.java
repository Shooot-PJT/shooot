package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectModifyPermissionDeniedException extends CustomException {

    public ProjectModifyPermissionDeniedException() {
        super(ProjectExceptionConstants.PROJECT_MODIFY_PERMISSION_DENIED);
    }
}
