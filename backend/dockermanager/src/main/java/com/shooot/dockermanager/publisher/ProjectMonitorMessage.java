package com.shooot.dockermanager.publisher;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectMonitorMessage implements Message {

    private Integer projectId;
    private Integer projectJarFileId;

    private Double cpu;
    private Double memory;
    private Double disk;
    private Double network;
}
