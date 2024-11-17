package com.shooot.dockermanager.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ProjectMonitorRequest {

    Integer projectId;
    Integer projectJarFileId;
    Integer duration;
    Integer vUser;
    String testMethod;
    String method;
    String url;
    Long stressTestLogId;
}
