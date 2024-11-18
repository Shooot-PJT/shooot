package com.shooot.application.stresstest.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestUsageResponse {

    private String method;
    private String url;
    private Usage avg;
    private Usage max;
    private Usage min;
    private Usage curr;
}
