package com.shooot.application.stresstest.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestResponse {

    private String method;
    private String url;
    private StressTestValue curr;
    private StressTestValue avg;
    private StressTestValue min;
    private StressTestValue max;
}
