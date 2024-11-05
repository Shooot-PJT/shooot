package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestStatusType;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseListView {
    private Integer id;
    private Integer apiId;
    private String title;
    private ApiTestStatusType type;
    private HttpStatus httpStatusCode;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ApiTestCaseListView from(ApiTestCase apiTestCase){
        return ApiTestCaseListView.builder()
                .id(apiTestCase.getId())
                .apiId(apiTestCase.getApi().getId())
                .title(apiTestCase.getTitle())
                .httpStatusCode(apiTestCase.getHttpStatus())
                .type(apiTestCase.getTestCaseStatus())
                .createdAt(apiTestCase.getCreatedAt())
                .modifiedAt(apiTestCase.getModifiedAt())
                .build();
    }
}
