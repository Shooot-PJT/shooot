package com.shooot.dockermanager.handler;

import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MetaData implements Serializable {
    @Serial
    private static final long serialVersionUID = 8123490234578902358L;
    private Integer projectId;
    private Integer projectJarFileId;
    private String projectName;
    private ProjectVersion projectVersion;
    private String instanceName;
}
