package com.shooot.application.stresstest.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestValue {

    private Double cpu;
    private Double memory;
    private Double disk;
    private Double network;
}
