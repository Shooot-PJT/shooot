package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestStatusType;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiView {
    private Integer id;
    private Integer domainId;
    private Integer managerId;
    private String title;
    private String description;
    private String method;
    private String url;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Boolean isRealServer;
    private Boolean isSecure;
    private ApiTestStatusType type;

    public static ApiView from(Api api){

        return ApiView.builder()
                .id(api.getId())
                .domainId(api.getDomain().getId())
                .managerId(api.getProjectParticipant().getId())
                .title(api.getTitle())
                .description(api.getDescription())
                .method(api.getMethod())
                .url(api.getUrl())
                .createdAt(api.getCreatedAt())
                .modifiedAt(api.getModifiedAt())
                .isRealServer(api.getIsRealServer())
                .isSecure(api.getIsSecure())
                .type(api.getTestStatus() == null ? ApiTestStatusType.YET : api.getTestStatus())
                .build();
    }
}