package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class ProjectNotParticipantException extends CustomException {
    public ProjectNotParticipantException(){
        super(ProjectExceptionConstants.PROJECT_NOT_PARTICIPANT_EXCEPTION);
    }
}
