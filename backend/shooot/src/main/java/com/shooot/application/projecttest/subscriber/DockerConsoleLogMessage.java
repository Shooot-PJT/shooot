package com.shooot.application.projecttest.subscriber;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DockerConsoleLogMessage implements Message {
    private Integer projectId;
    private Integer projectJarFileId;
    private String log;
}
