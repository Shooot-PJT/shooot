package com.shooot.application.project.service.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectRegisterRequest {

    private String name;
    private String englishName;
    private String memo;
}
