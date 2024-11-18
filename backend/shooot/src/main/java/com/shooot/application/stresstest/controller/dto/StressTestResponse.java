package com.shooot.application.stresstest.controller.dto;

import com.shooot.application.stresstest.ui.dto.Usage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestResponse {

    private Integer projectJarFileId;

    private Usage curr;
    private Usage avg;
    private Usage min;
    private Usage max;

    private String httpMethod;
    private String url;
}
