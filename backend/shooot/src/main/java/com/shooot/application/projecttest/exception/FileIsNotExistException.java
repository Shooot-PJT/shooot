package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class FileIsNotExistException extends CustomException {
    public FileIsNotExistException() {
        super(ProjectBuildExceptionConstants.FILE_IS_NOT_EXIST);
    }
}
