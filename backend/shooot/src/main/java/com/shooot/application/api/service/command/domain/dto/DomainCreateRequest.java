package com.shooot.application.api.service.command.domain.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DomainCreateRequest {
    private Integer projectId;
    private String title;
    private String description;
}
