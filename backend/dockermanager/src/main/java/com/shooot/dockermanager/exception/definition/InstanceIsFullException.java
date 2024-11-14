package com.shooot.dockermanager.exception.definition;

import com.shooot.dockermanager.exception.CustomException;
import com.shooot.dockermanager.exception.CustomExceptionDefinition;

public class InstanceIsFullException extends CustomException {
    public InstanceIsFullException() {
        super(DockerExceptionConstants.INSTANCE_IS_FULL_EXCEPTION);
    }
}
