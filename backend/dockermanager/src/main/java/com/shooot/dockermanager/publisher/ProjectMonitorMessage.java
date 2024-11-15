package com.shooot.dockermanager.publisher;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectMonitorMessage implements Message {

    private Integer projectId;
    private Integer projectJarFileId;
    private String message;
}
