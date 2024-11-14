package com.shooot.application.api.exception.testcase;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum TestCaseExceptionConstants implements CustomExceptionDefinition {
    TEST_CASE_NOT_FOUND_EXCEPTION("테스트케이스가 존재하지 않습니다.", "T001", HttpStatus.NOT_FOUND),
    TEST_CASE_REQUEST_NOT_FOUND_EXCEPTION("테스트케이스 요청이 존재하지 않습니다.", "T002", HttpStatus.NOT_FOUND),
    TEST_CASE_FILE_NOT_VALID_EXCEPTION("테스트 케이스 파일들이 유효하지 않습니다.", "T003", HttpStatus.BAD_REQUEST),
    TEST_CASE_FILE_EXTENSION_NOT_ALLOW("파일의 확장자가 지원하지 않습니다.", "T004", HttpStatus.BAD_REQUEST)
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
