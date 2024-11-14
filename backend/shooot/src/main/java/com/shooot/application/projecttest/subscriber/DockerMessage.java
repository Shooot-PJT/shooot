package com.shooot.application.projecttest.subscriber;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DockerMessage implements Message{
    private Integer projectId;
    private Integer projectJarFileId;
}
