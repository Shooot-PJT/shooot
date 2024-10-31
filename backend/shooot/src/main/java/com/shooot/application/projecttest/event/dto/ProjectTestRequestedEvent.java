package com.shooot.application.projecttest.event.dto;

import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTestRequestedEvent {
    private List<Integer> apiId;
    private Integer projectJarFileId;
}
