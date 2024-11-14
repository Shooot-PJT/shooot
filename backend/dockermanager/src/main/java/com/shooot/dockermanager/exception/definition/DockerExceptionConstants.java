package com.shooot.dockermanager.exception.definition;

import com.shooot.dockermanager.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum DockerExceptionConstants implements CustomExceptionDefinition {
    INSTANCE_IS_FULL_EXCEPTION("현재 가용 가능한 인스턴스가 없습니다.", "PJ002", HttpStatus.FORBIDDEN)
    ;

    private final String message;
    private final String code;
    private  final HttpStatus statusCode;

}
