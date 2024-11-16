package com.shooot.application.api.exception.subscribe;


import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum SubscribeExceptionConstants implements CustomExceptionDefinition{
    DOMAIN_NOT_SUBSCRIBE_EXCEPTION("구독중이지 않은 도메인입니다", "S001", HttpStatus.BAD_REQUEST),
    DOMAIN_SUBSCRIBE_EXCEPTION("이미 구독중인 도메인입니다.", "S002", HttpStatus.BAD_REQUEST)
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
