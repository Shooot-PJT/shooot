package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class InstanceIsFullException extends CustomException {
    public InstanceIsFullException() {
        super(ProjectBuildExceptionConstants.INSTANCE_IS_FULL_EXCEPTION);
    }
}
