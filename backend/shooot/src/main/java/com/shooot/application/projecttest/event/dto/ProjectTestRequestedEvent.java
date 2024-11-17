package com.shooot.application.projecttest.event.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTestRequestedEvent {

    private List<Integer> apiId;
    private Integer projectJarFileId;
    private Long stressTestLogId;
}
