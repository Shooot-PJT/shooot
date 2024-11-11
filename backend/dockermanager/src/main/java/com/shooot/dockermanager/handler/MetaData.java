package com.shooot.dockermanager.handler;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MetaData implements Serializable {
    @Serial
    private static final long serialVersionUID = 8123490234578902358L;
    private Integer projectId;
    private Integer projectJarFileId;
    private String projectName;
    private String instanceName;
}
