package com.shooot.dockermanager.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ProjectMonitorRequest {

    private Integer projectId;
    private Integer projectJarFileId;
    private Integer duration;
    private String method;
    private String url;
    Integer vUser;
    String testMethod;
    Long stressTestLogId;
}
