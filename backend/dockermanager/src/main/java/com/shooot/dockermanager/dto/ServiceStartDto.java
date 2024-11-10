package com.shooot.dockermanager.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceStartDto {
    private Integer projectJarFileId;
    private Integer projectId;
}
