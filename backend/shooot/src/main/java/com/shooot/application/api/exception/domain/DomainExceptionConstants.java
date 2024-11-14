package com.shooot.application.api.exception.domain;


import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum DomainExceptionConstants implements CustomExceptionDefinition{
    DOMAIN_NOT_FOUND_EXCEPTION("도메인이 존재하지 않습니다.", "D001", HttpStatus.NOT_FOUND),
    DOMAIN_DELETE_DENIED_EXCEPTION("삭제할 권한이 없습니다", "D002", HttpStatus.FORBIDDEN),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
