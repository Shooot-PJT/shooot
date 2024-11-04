package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;
import com.shooot.application.common.exception.CustomExceptionDefinition;

public class FileIsNotJarFileException extends CustomException {
    public FileIsNotJarFileException() {
        super(ProjectBuildExceptionConstants.FILE_IS_NOT_JAR_FILE);
    }
}
