package com.shooot.application.api.exception.testcase;

import com.shooot.application.common.exception.CustomException;

public class TestCaseFileExtensionNotAllowException extends CustomException {
    public TestCaseFileExtensionNotAllowException(){ super(TestCaseExceptionConstants.TEST_CASE_FILE_EXTENSION_NOT_ALLOW); }
}

