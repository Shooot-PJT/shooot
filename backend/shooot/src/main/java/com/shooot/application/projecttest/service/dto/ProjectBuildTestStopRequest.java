package com.shooot.application.projecttest.service.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectBuildTestStopRequest {

    private Integer projectJarFileId;
}
