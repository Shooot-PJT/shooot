package com.shooot.dockermanager.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceStopDto {
    private String projectName;
}
