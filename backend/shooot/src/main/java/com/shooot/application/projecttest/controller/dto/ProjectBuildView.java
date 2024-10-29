package com.shooot.application.projecttest.controller.dto;

import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectBuildStatus;
import com.shooot.application.projecttest.domain.ProjectVersion;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectBuildView {
    private Integer projectJarFileId;
    private String status;
    private String fileName;
    private ProjectVersion version;


    public ProjectBuildView(ProjectBuild projectBuild, ProjectBuildStatus status) {
        this.projectJarFileId = projectBuild.getId();
        this.status = status == null ? ProjectBuildStatus.NONE.name() : status.name();
        this.fileName = projectBuild.getFileName();
        version = projectBuild.getVersion();
    }
}
