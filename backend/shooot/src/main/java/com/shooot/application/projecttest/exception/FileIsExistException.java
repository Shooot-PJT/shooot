package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class FileIsExistException extends CustomException {
    public FileIsExistException() {
        super(ProjectBuildExceptionConstants.FILE_IS_EXIST);
    }
}
