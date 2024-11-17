package com.shooot.application.projecttest.event.handler;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StressTestRequest {

    Integer projectId;
    Integer projectJarFileId;
    Integer duration;
    String method;
    String url;
}
