package com.shooot.application.api.ui.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectClientTotalLoginRequest {
    private String id;
    private String password;
    private String sessionName;
    private String url;
    private Integer projectId;
}
