package com.shooot.application.api.service.command.test.dto;

import lombok.*;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private Pageable pageable;

    @Override
    public String toString() {
        return "TestLogSearchRequest{" +
                "testcaseId=" + testcaseId +
                ", testerId=" + testerId +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", pageable=" + pageable +
                '}';
    }
}
