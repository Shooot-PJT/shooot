package com.shooot.application.api.exception.domain;

import com.shooot.application.common.exception.CustomException;

public class DomainDeleteDeniedException extends CustomException {
    public DomainDeleteDeniedException() {
        super(DomainExceptionConstants.DOMAIN_NOT_FOUND_EXCEPTION);
    }
}
