package com.shooot.application.projecttest.service.dto;

import lombok.Data;


@Data
public class ApiTestMethodRequest {
    private Integer apiId;
    private String method;
    private Integer vuserNum;
    private Integer duration;
}
