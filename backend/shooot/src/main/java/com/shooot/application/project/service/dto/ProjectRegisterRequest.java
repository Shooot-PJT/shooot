package com.shooot.application.project.service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectRegisterRequest {

    @NotNull
    private String name;

    @Size(min = 1, max = 20, message = "사용자 이름은 1자 이상 20자 이하여야 합니다.")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "사용자 이름은 영어 소문자, 숫자, 그리고 하이픈(-)만 포함할 수 있습니다.")
    private String englishName;

    private String memo;
}
