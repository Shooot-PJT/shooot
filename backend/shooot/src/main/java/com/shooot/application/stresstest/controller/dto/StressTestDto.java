package com.shooot.application.stresstest.controller.dto;

import lombok.Builder;

@Builder
public class StressTestDto {

    private Float cpuUtilization;
    private Float ramUtilization;
}
