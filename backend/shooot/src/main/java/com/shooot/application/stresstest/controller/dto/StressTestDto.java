package com.shooot.application.stresstest.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StressTestDto {

    private Float cpuUtilization;
    private Float ramUtilization;
}
