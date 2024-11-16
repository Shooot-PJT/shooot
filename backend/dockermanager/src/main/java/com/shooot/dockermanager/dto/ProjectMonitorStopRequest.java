package com.shooot.dockermanager.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectMonitorStopRequest {

    private Integer projectJarFileId;
}
