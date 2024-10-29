package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectInvitationNotFoundException extends CustomException {

    public ProjectInvitationNotFoundException() {
        super(ProjectExceptionConstants.PROJECT_INVITATION_NOT_FOUND);
    }
}
