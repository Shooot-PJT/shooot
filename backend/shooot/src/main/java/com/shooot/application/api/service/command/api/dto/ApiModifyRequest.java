package com.shooot.application.api.service.command.api.dto;

import lombok.*;

import java.util.Map;

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
    private String exampleUrl;
    private Object exampleContent;
    private String method;
    private Boolean isSecure;

    @Override
    public String toString() {
        return "ApiModifyRequest{" +
                "managerId=" + managerId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", exampleUrl='" + exampleUrl + '\'' +
                ", exampleContent=" + exampleContent +
                ", method='" + method + '\'' +
                ", isSecure=" + isSecure +
                '}';
    }
}
