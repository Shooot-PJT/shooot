package com.shooot.application.api.exception.subscribe;

import com.shooot.application.common.exception.CustomException;

public class DomainNotSubscribeException extends CustomException {
    public DomainNotSubscribeException(){
        super(SubscribeExceptionConstants.DOMAIN_SUBSCRIBE_EXCEPTION);
    }
}
