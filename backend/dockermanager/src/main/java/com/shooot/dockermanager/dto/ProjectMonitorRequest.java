package com.shooot.dockermanager.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectMonitorRequest {

    private Integer projectId;
    private Integer projectJarFileId;
    private Integer duration;
    private String method;
    private String url;
}
