package com.shooot.application.api.ui.dto;

import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiDetailListView {
    private List<ApiTestCaseListView> testCases;
//    private ApiTestLastLogView lastLog;
}
