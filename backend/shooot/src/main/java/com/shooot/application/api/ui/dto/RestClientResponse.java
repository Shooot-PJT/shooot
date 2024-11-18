package com.shooot.application.api.ui.dto;


import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RestClientResponse {
    private String session;
    private Integer responseCode;
    private String responseMessage;
}
