package com.shooot.application.api.ui.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestLastLogView {
    private Integer id;
    private Integer managerId;
    private String managerName;
    private Boolean isSuccess;
    private HttpStatus httpStatus;
    private LocalDateTime createdAt;
    private String httpBody;
    private String httpHeader;
}
