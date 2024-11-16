package com.shooot.application.stresstest.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StressTestDto {

    private Double cpu;
    private Double memory;
    private Double disk;
    private Double network;
    private String method;
    private String url;
}
