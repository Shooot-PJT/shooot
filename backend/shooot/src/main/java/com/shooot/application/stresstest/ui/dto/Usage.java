package com.shooot.application.stresstest.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usage {

    private Double cpu;
    private Double memory;
    private Double disk;
    private Double network;
}
