package com.shooot.application.api.exception.subscribe;

import com.shooot.application.api.exception.domain.DomainExceptionConstants;
import com.shooot.application.common.exception.CustomException;

public class DomainSubscribeException extends CustomException {
    public DomainSubscribeException() {
        super(SubscribeExceptionConstants.DOMAIN_SUBSCRIBE_EXCEPTION);
    }
}