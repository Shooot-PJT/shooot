package com.shooot.dockermanager.dto;

import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceStartDto {
    private Integer projectJarFileId;
    private List<Integer> testingApiId;
}
