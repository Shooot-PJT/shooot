package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCaseRequestType;
import com.shooot.application.api.domain.ApiTestStatusType;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiDetailView {
    private Integer apiTestCaseId;
    private Api apiId;
    private String title;
    private HttpStatus httpStatusCode;
    private ApiTestStatusType testCaseStatus;
    private LocalDateTime modifiedAt;
    private LocalDateTime createdAt;
    private Integer apiTestCaseRequestId;
    private ApiTestCaseRequestType requestType;
    private Map<String, Object> content;
    private UUID apiTestLogId;
    private HttpStatus logHttpStatus;
    private String logHttpBody;
    private String logHttpHeader;

}