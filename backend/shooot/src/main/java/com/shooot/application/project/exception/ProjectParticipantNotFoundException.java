package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectParticipantNotFoundException extends CustomException {

    public ProjectParticipantNotFoundException() {
        super(ProjectExceptionConstants.PROJECT_PARTICIPANT_NOT_FOUND);
    }
}
