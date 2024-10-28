package com.shooot.application.api.service.command.api.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiToggleModifyRequest {
    private Boolean isSecure;
    private Boolean isRealServer;
}
