package com.shooot.application.api.service.command.testcase.dto;

import lombok.*;

import java.time.LocalDate;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestLogSearchRequest {
    private Integer testcaseId;
    private Integer testerId;
    private Boolean isSuccess;
    private LocalDate startDate;
    private LocalDate endDate;

    @Override
    public String toString() {
        return "TestLogSearchRequest{" +
                "testcaseId=" + testcaseId +
                ", testerId=" + testerId +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
