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
    PROJECT_MODIFY_PERMISSION_DENIED("프로젝트 정보를 수정하기 위한 권한이 부족합니다.", "P006", HttpStatus.FORBIDDEN);

    private final String message;
    private final String code;
    private final HttpStatus statusCode;
}
