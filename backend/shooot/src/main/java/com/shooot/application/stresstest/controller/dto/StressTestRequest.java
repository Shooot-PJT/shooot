package com.shooot.application.stresstest.controller.dto;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.Getter;

@Getter
public class StressTestRequest {

    private Integer vuserNum;
    private Integer duration;
    private String method;
}
