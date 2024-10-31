package com.shooot.application.api.service.command.test.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseModifyRequest {
    private String title;
    private Integer expectHttpStatus;
}
