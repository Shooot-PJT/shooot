package com.shooot.application.project.ui.dto;

import com.shooot.application.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectView {

    private String name;
    private String englishName;
    private String logoImageUrl;
    private String memo;

    public static ProjectView from(Project project) {
        return ProjectView.builder()
            .name(project.getName())
            .englishName(project.getEnglishName())
            .logoImageUrl(project.getLogoImageUrl())
            .memo(project.getMemo())
            .build();
    }
}
