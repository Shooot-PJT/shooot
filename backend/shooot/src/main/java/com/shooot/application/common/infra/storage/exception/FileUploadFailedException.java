package com.shooot.application.common.infra.storage.exception;

import com.shooot.application.common.exception.CustomException;

public class FileUploadFailedException extends CustomException {

    public FileUploadFailedException() {
        super(StorageExceptionConstants.FILE_UPLOAD_FAILED);
    }
}
