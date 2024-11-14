package com.shooot.application.projecttest.event.dto;

import lombok.*;

import java.io.File;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectBuildUploadedEvent {
    private Integer projectBuildId;
    private File jarFile;
}
