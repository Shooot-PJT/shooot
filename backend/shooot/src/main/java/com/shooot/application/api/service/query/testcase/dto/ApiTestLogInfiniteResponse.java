package com.shooot.application.api.service.query.testcase.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestLogInfiniteResponse {
    private UUID id;
    private Integer projectId;
    private String tester;
    private Integer testCaseId;
    private Boolean isSuccess;
    private HttpStatus httpStatus;
    private String httpBody;
    private String httpHeader;
    private LocalDateTime createdAt;

}
