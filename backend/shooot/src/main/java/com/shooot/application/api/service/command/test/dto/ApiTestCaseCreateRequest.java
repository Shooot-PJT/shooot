package com.shooot.application.api.service.command.test.dto;

import com.shooot.application.api.domain.ApiTestCaseRequestType;
import lombok.*;
import org.springframework.http.HttpStatus;

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
