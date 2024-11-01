package com.shooot.application.api.ui.dto;

import com.shooot.application.project.domain.ProjectParticipant;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestLogView {

    private UUID id;
    private ProjectParticipant projectParticipant;
    private Integer apiTestCaseId;
    private HttpStatus httpStatus;
    private String httpBody;
    private String httpHeader;
    private LocalDateTime createdAt;

}
