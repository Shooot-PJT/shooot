package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestStatusType;
import com.shooot.application.user.domain.ProfileColor;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiView {
    private Integer id;
    private Integer domainId;
    private Integer managerId;
    private String managerName;
    private ProfileColor profileColor;
    private String title;
    private String description;
    private String method;
    private String url;
    private String example_url;
    private Map<String, Object> example_content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Boolean isRealServer;
    private Boolean isSecure;
    private Boolean isDeleted;
    private ApiTestStatusType testStatus;

    public static ApiView from(Api api){

        return ApiView.builder()
                .id(api.getId())
                .domainId(api.getDomain().getId())
                .managerId(api.getProjectParticipant().getId())
                .managerName(api.getProjectParticipant().getUser().getNickname())
                .profileColor(api.getProjectParticipant().getUser().getColor())
                .title(api.getTitle())
                .description(api.getDescription())
                .method(api.getMethod() == null ? null : api.getMethod().toLowerCase())
                .url(api.getUrl())
                .example_url(api.getExampleUrl())
                .example_content(api.getExampleContent())
                .createdAt(api.getCreatedAt())
                .modifiedAt(api.getModifiedAt())
                .isRealServer(api.getIsRealServer())
                .isSecure(api.getIsSecure())
                .isDeleted(api.getIsDeleted())
                .testStatus(api.getTestStatus())
                .build();
    }
}
