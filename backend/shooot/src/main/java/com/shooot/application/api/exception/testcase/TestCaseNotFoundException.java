package com.shooot.application.api.exception.testcase;

import com.shooot.application.common.exception.CustomException;

public class TestCaseNotFoundException extends CustomException {
    public TestCaseNotFoundException(){ super(TestCaseExceptionConstants.TEST_CASE_NOT_FOUND_EXCEPTION); }
}
