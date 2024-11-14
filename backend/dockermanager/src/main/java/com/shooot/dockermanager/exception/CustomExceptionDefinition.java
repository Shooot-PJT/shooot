package com.shooot.dockermanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface CustomExceptionDefinition {
    String getMessage();
    String getCode();
    HttpStatus getStatusCode();

    default ResponseEntity<ErrorResponse> toErrorResponse() {
        return new ResponseEntity<>(new ErrorResponse(getMessage(), getCode()), getStatusCode());
    }

}
