package com.shooot.application.api.service.command.api.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiModifyRequest {
    private Integer managerId;
    private String title;
    private String description;
    private String url;
    private String method;
    private Boolean isSecure;
}
