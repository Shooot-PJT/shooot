package com.shooot.dockermanager.dto;

import com.shooot.dockermanager.domain.projecttest.BuildFileTestMethod;
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
