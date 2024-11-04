package com.shooot.application.common.infra.storage.exception;

import com.shooot.application.common.exception.CustomException;

public class FileDownloadFailedException extends CustomException {

    public FileDownloadFailedException() {
        super(StorageExceptionConstants.FILE_DOWNLOAD_FAILED);
    }
}
