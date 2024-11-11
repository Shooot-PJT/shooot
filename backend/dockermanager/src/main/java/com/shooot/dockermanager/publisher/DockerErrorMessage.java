package com.shooot.dockermanager.publisher;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DockerErrorMessage implements Message{
    private Integer projectId;
    private Integer projectJarFileId;
}
