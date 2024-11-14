package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.*;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestCaseView {
    private Integer id;
//    private Integer testCaseRequestId;
    private Integer apiId;
    private String title;
    private Integer httpStatusCode;
    private ApiTestStatusType type;
    private Integer apiTestCaseRequestId;
    private ApiTestCaseRequestType requestType;
    private Map<String, Object> content;

    public static ApiTestCaseView from(ApiTestCase apiTestCase, ApiTestCaseRequest apiTestCaseRequest){

        return ApiTestCaseView.builder()
                .id(apiTestCase.getId())
//                .apiTestCaseRequestId(apiTestCaseRequest.getId())
                .apiId(apiTestCase.getApi().getId())
                .title(apiTestCase.getTitle())
                .httpStatusCode(apiTestCase.getHttpStatus().value())
                .type(apiTestCase.getTestCaseStatus())
                .apiTestCaseRequestId(apiTestCaseRequest.getId())
                .requestType(apiTestCaseRequest.getType())
                .content(apiTestCaseRequest.getContent())
                .build();
    }

}

