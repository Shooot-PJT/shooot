package com.shooot.application.project.exception;

import com.shooot.application.common.exception.CustomExceptionDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ProjectExceptionConstants implements CustomExceptionDefinition {
    DUPLICATE_ENGLISH_NAME_EXCEPTION("영문명이 이미 존재합니다.", "P002", HttpStatus.CONFLICT),
    PROJECT_NOT_FOUND("프로젝트를 찾을 수 없습니다.", "P003", HttpStatus.NOT_FOUND),
    PROJECT_INVITATION_NOT_FOUND("프로젝트 초대장을 찾을 수 없습니다.", "P004", HttpStatus.NOT_FOUND),
    PROJECT_PARTICIPANT_NOT_FOUND("프로젝트 참여자를 찾을 수 없습니다.", "P005", HttpStatus.NOT_FOUND),
    PROJECT_PERMISSION_DENIED("권한이 부족합니다.", "P006", HttpStatus.FORBIDDEN),
    PROJECT_NAME_NOT_VALID("프로젝트 이름이 올바르지 않습니다.", "P007",
        HttpStatus.BAD_REQUEST),
    PROJECT_ENGLISH_NAME_NOT_VALID("프로젝트 영문 이름이 올바르지 않습니다."
        + "1자 이상 20자 이하여야 합니다."
        + "영어 소문자, 숫자, 그리고 하이픈(-)만 포함할 수 있습니다.", "P008",
        HttpStatus.BAD_REQUEST),
    DUPLICATE_PROJECT_PARTICIPANT("프로젝트 참여자가 이미 존재합니다.", "P009", HttpStatus.CONFLICT),
    PROJECT_INTERNAL_SERVER_ERROR("관리자에게 문의하세요.", "P010", HttpStatus.INTERNAL_SERVER_ERROR),
    PROJECT_NOT_PARTICIPANT_EXCEPTION("해당 프로젝트에 참여중이지 않습니다.", "P011", HttpStatus.FORBIDDEN);
    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
