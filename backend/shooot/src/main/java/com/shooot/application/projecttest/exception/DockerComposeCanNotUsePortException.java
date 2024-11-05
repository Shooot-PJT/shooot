package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class DockerComposeCanNotUsePortException extends CustomException {
    public DockerComposeCanNotUsePortException() {
        super(ProjectBuildExceptionConstants.DOCKER_COMPOSE_CAN_NOT_USE_PORT);
    }
}
