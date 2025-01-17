package com.shooot.application.projecttest.handler;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApiInfoDto {
    private String url;
    private String method;
}
