package com.shooot.application.projecttest.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectBuildTestStopRequest {

    private Integer projectId;
    private Integer projectJarFileId;
}
