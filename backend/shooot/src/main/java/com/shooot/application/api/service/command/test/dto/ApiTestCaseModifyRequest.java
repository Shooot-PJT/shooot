package com.shooot.application.api.service.command.test.dto;

import com.shooot.application.api.domain.ApiTestCaseRequestType;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseModifyRequest {
    private String title;
    private Integer httpStatusCode;
    private ApiTestCaseRequestType type;
}
