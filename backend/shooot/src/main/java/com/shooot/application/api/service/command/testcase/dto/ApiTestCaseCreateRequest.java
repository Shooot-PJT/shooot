package com.shooot.application.api.service.command.testcase.dto;

import com.shooot.application.api.domain.ApiTestCaseRequestType;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseCreateRequest {
    private String title;
    private Integer httpStatusCode;
    private ApiTestCaseRequestType type;
}
