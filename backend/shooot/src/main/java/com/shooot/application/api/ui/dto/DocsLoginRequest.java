package com.shooot.application.api.ui.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DocsLoginRequest {
    private String endpoint;
    private String info;
    private Integer projectId;
}
