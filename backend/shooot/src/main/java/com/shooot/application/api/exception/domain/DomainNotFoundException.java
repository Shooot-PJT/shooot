package com.shooot.application.api.exception.domain;

import com.shooot.application.common.exception.CustomException;

public class DomainNotFoundException extends CustomException {
    public DomainNotFoundException() {
        super(DomainExceptionConstants.DOMAIN_NOT_FOUND_EXCEPTION);
    }
}


