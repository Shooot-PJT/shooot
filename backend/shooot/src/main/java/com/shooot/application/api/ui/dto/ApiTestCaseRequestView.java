package com.shooot.application.api.ui.dto;

import lombok.*;

import java.util.Map;
import java.util.Objects;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseRequestView {
    private Integer id;
    private Integer apiTestCase;
    private String type;
    private Map<String, Object> content;
}
