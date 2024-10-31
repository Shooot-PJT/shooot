package com.shooot.application.api.exception.testcase;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum TestCaseExceptionConstants implements CustomExceptionDefinition {
    TEST_CASE_NOT_FOUND_EXCEPTION("테스트케이스가 존재하지 않습니다.", "T001",HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
