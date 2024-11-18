package com.shooot.application.stresstest.service;

import com.shooot.application.projecttest.domain.BuildFileTestMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestStartRequest {

    Integer projectId;
    Integer projectJarFileId;
    Long stressTestLogId;
    String httpMethod;
    String url;
    Integer numberOfThreads;
    Integer duration;
    BuildFileTestMethod testMethod;
}
