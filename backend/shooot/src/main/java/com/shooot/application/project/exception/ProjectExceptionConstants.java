package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ProjectExceptionConstants implements CustomExceptionDefinition {
    DUPLICATE_ENGLISH_NAME_EXCEPTION("영문명이 이미 존재합니다.", "P002", HttpStatus.CONFLICT);

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
