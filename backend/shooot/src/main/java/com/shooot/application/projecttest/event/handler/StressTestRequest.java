package com.shooot.application.projecttest.event.handler;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class StressTestRequest {

    Integer projectId;
    Integer projectJarFileId;
    Integer duration;
    Integer vUser;
    String testMethod;
    String method;
    String url;
    Long stressTestLogId;
}
