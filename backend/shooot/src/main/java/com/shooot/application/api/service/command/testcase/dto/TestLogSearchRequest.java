package com.shooot.application.api.service.command.testcase.dto;

import lombok.*;

import java.time.LocalDate;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestLogSearchRequest {
    private Integer apiId;
    private Integer testcaseId;
    private Integer testerId;
    private Boolean isSuccess;
    private LocalDate startDate;
    private LocalDate endDate;

}
