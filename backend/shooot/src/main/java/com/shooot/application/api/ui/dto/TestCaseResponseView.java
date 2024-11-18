package com.shooot.application.api.ui.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseResponseView {
    private Integer testcaseId;
    private String testResult;
}
