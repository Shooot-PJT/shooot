package com.shooot.application.project.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ProjectResponse {

    private Integer projectId;
    private String name;
    private String englishName;
    private String logoImageUrl;
    private String memo;
    private Integer userCount;
    private Boolean isOwner;
}
