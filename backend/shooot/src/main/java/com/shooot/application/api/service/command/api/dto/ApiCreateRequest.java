package com.shooot.application.api.service.command.api.dto;

import lombok.*;

import java.util.Optional;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiCreateRequest {
    private Integer managerId;
    private String title;
    private String description;
    @Builder.Default
    private Optional<String> url = Optional.empty();
}
