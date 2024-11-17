package com.shooot.application.project.ui.dto;

import com.shooot.application.projecttest.domain.BuildFileTestMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStressTestResultResponse {

    private String httpMethod;
    private String url;
    private Integer duration;
    private Integer vUser;
    private BuildFileTestMethod testMethod;
    private Double avgCpu;
    private Double maxCpu;
    private Double minCpu;
    private Double avgMemory;
    private Double maxMemory;
    private Double minMemory;
    private Double avgDisk;
    private Double maxDisk;
    private Double minDisk;
    private Double avgNetwork;
    private Double maxNetwork;
    private Double minNetwork;
}
