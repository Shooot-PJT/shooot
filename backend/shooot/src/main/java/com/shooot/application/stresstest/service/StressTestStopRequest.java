package com.shooot.application.stresstest.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestStopRequest {

    private Integer projectJarFileId;
}
