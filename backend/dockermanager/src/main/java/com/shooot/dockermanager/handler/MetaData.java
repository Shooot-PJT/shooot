package com.shooot.dockermanager.handler;

import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MetaData {
    private String projectName;
    private ProjectVersion projectVersion;
    private String instanceName;
}
