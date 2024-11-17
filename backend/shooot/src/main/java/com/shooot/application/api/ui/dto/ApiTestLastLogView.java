package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.ApiTestLog;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestLastLogView {
    private UUID id;
    private Integer managerId;
    private String managerName;
    private Boolean isSuccess;
    private Integer httpStatus;
    private LocalDateTime createdAt;
    private Integer resultCode;
    private String response;
//    private String httpBody;
//    private String httpHeader;

    public static ApiTestLastLogView from(ApiTestLog apiTestLog){
        return ApiTestLastLogView.builder()
                .id(apiTestLog.getId())
                .managerId(apiTestLog.getProjectParticipant().getId())
                .managerName(apiTestLog.getProjectParticipant().getUser().getNickname())
                .isSuccess(apiTestLog.getIsSuccess())
                .httpStatus(apiTestLog.getHttpStatus().value())
                .createdAt(apiTestLog.getCreatedAt())
                .resultCode(apiTestLog.getResponseCode() == null ? 200 : apiTestLog.getResponseCode().value())
                .response(apiTestLog.getResponseMessage() == null ? "" : apiTestLog.getResponseMessage())
//                .httpBody(apiTestLog.getHttpBody())
//                .httpHeader(apiTestLog.getHttpHeader())
                .build();
    }
}
