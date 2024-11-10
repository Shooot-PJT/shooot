package com.shooot.application.api.ui.dto;


import com.shooot.application.api.domain.ApiTestStatusType;
import lombok.*;

import java.util.Map;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseView {
    private Integer id;
    private String type;
    private Map<String, Object> content;

}
