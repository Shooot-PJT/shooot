package com.shooot.application.api.exception.api;

import com.shooot.application.api.exception.domain.DomainExceptionConstants;
import com.shooot.application.common.exception.CustomException;

public class ApiNotFoundException extends CustomException {
    public ApiNotFoundException(){ super(ApiExceptionConstants.API_NOT_FOUND_EXCEPTION); }
}
