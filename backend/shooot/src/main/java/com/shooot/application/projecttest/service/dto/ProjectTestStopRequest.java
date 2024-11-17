package com.shooot.application.projecttest.service.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectTestStopRequest {

    private Integer projectJarFileId;
}
