package com.shooot.application.api.exception.testcase;

import com.shooot.application.common.exception.CustomException;

public class TestCaseRequestNotFoundException extends CustomException {
    public TestCaseRequestNotFoundException(){ super(TestCaseExceptionConstants.TEST_CASE_REQUEST_NOT_FOUND_EXCEPTION); }
}
