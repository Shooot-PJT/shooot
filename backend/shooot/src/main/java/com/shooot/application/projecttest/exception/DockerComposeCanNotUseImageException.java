package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class DockerComposeCanNotUseImageException extends CustomException {
    public DockerComposeCanNotUseImageException() {
        super(ProjectBuildExceptionConstants.DOCKER_COMPOSE_CAN_NOT_USE_IMAGE);
    }
}
