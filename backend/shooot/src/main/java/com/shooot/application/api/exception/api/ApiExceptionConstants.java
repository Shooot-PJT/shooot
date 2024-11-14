package com.shooot.application.api.exception.api;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApiExceptionConstants implements CustomExceptionDefinition {
    API_NOT_FOUND_EXCEPTION("API 존재하지 않습니다.", "A001", HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
