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
    FILE_IS_NOT_EXIST("파일을 찾을 수 없습니다.", "T004", HttpStatus.NOT_FOUND),
    DOCKER_COMPOSE_CAN_NOT_USE_IMAGE("지정한 docker-compose의 이미지를 사용할 수 없습니다.", "T005",
        HttpStatus.BAD_REQUEST),
    DOCKER_COMPOSE_CAN_NOT_USE_PORT("지정한 docker-compose에 특정 포트를 사용할 수 없습니다.", "T005",
        HttpStatus.BAD_REQUEST),
    DOCKER_COMPOSE_CAN_NOT_USE_NETWORK("docker-compose에 네트워크를 사용할 수 없습니다.", "T005",
        HttpStatus.BAD_REQUEST),
    DOCKER_COMPOSE_CAN_NOT_USE_VOLUME("docker-compose에 볼륨을 사용할 수 없습니다.", "T005",
        HttpStatus.BAD_REQUEST),
    INSTANCE_IS_FULL_EXCEPTION("현재 가용 가능한 인스턴스가 없습니다.", "T006", HttpStatus.FORBIDDEN),
    FILE_IS_NOT_DEPLOYMENT("현재 배포중인 서버가 아닙니다.", "R001", HttpStatus.BAD_REQUEST),
    FILE_IS_DEPLOYMENT("현재 배포중인 서버입니다.", "R002", HttpStatus.BAD_REQUEST),
    TEST_ALREADY_RUNNING("이미 테스트 실행 중입니다.", "T007", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String code;
    private final HttpStatus statusCode;

}
