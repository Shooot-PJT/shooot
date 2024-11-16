package com.shooot.application.api.ui.dto;


import com.shooot.application.api.domain.ApiTestStatusType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseView {
    private Integer id;
    private Integer testCaseRequestId;
    private String title;
    private String testStatus;
    private Integer httpStatusCode;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String type;
    private Map<String, Object> content;

}
