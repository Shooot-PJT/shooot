package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestStatusType;
import lombok.*;

import java.util.Map;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseView {
    private Integer id;
    private Integer apiId;
    private String title;
    private Integer httpStatusCode;
    private ApiTestStatusType type;
    private Integer apiTestCaseRequestId;
    private String requestType;
    private Map<String, Object> content;

}

