package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class TestExecutorNotFoundException extends CustomException {

    public TestExecutorNotFoundException() {
        super(ProjectBuildExceptionConstants.TEST_EXECUTOR_NOT_FOUND_EXCEPTION);
    }
}
