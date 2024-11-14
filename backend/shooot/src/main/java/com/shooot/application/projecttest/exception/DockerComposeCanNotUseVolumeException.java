package com.shooot.application.projecttest.exception;

import com.shooot.application.common.exception.CustomException;

public class DockerComposeCanNotUseVolumeException extends CustomException {
    public DockerComposeCanNotUseVolumeException() {
        super(ProjectBuildExceptionConstants.DOCKER_COMPOSE_CAN_NOT_USE_VOLUME);
    }
}
