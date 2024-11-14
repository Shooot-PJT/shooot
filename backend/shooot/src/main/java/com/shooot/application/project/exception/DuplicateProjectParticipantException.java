package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomException;

public class DuplicateProjectParticipantException extends CustomException {

    public DuplicateProjectParticipantException() {
        super(ProjectExceptionConstants.DUPLICATE_PROJECT_PARTICIPANT);
    }
}
