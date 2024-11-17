package com.shooot.dockermanager.publisher;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectMonitorMessage implements Message {

    private Integer projectId;
    private Integer projectJarFileId;

    private StressTestValue curr;
    private StressTestValue avg;
    private StressTestValue min;
    private StressTestValue max;

    private String method;
    private String url;
}
