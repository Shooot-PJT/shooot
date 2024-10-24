package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ProjectBuildExceptionConstants implements CustomExceptionDefinition {
    FILE_IS_NOT_JAR_FILE("Jar 파일이 아닙니다", "T001", HttpStatus.FORBIDDEN),
    FILE_IS_EXIST("같은 Spring Boot Jar 파일이 존재합니다.", "T003", HttpStatus.FORBIDDEN),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;

}
