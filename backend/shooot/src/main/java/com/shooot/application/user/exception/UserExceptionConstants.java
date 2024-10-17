package com.shooot.application.user.exception;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UserExceptionConstants implements CustomExceptionDefinition {
    USER_EXIST_EXCEPTION("사용자가 이미 존재합니다.", "U002", HttpStatus.CONFLICT),
    EMAIL_VERIFICATION_REQUEST_NOT_FOUND("이메일 인증 요청을 먼저 해주시기 바랍니다.", "U003", HttpStatus.NOT_FOUND),
    EMAIL_VERIFICATION_NOT_FOUND("이메일 인증을 먼저 해주시기 바랍니다.", "U004", HttpStatus.NOT_FOUND),
    PASSWORD_NOT_MATCHED("비밀번호가 일치하지 않습니다", "U005", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND_EXCEPTION("사용자가 존재하지 않습니다.", "U006", HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
