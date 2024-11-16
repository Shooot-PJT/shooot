package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class TestAlreadyRunningException extends CustomException {

    public TestAlreadyRunningException() {
        super(ProjectBuildExceptionConstants.TEST_ALREADY_RUNNING);
    }
}
