package com.shooot.application.projecttest.service.dto;

import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectBuildTestRunRequest {
    private Integer projectJarFileId;
    private List<ApiTestMethodRequest> endPointSettings;
}
