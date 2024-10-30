package com.shooot.application.common.infra.storage.exception;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum StorageExceptionConstants implements CustomExceptionDefinition {
    FILE_NOT_FOUND("파일을 찾을 수 없습니다.", "S002", HttpStatus.NOT_FOUND),
    FILE_UPLOAD_FAILED("파일 업로드에 실패하였습니다.", "S003", HttpStatus.INTERNAL_SERVER_ERROR),
    FILE_DOWNLOAD_FAILED("파일 다운로드에 실패하였습니다.", "S004", HttpStatus.INTERNAL_SERVER_ERROR),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
