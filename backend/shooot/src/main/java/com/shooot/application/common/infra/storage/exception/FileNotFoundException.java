package com.shooot.application.common.infra.storage.exception;

import com.shooot.application.common.exception.CustomException;

public class FileNotFoundException extends CustomException {

    public FileNotFoundException() {
        super(StorageExceptionConstants.FILE_NOT_FOUND);
    }
}
