package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class DockerComposeCanNotUseNetworkException extends CustomException {
    public DockerComposeCanNotUseNetworkException() {
        super(ProjectBuildExceptionConstants.DOCKER_COMPOSE_CAN_NOT_USE_NETWORK);
    }
}
