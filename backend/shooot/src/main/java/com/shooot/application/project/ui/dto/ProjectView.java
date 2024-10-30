package com.shooot.application.project.ui.dto;

import com.shooot.application.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.util.UriComponentsBuilder;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectView {

    @Value("${url.project.logo}")
    private static String logoUrl;

    private String name;
    private String englishName;
    private String logoImageUrl;
    private String memo;

    public static ProjectView from(Project project) {
        String url = UriComponentsBuilder.fromHttpUrl(logoUrl)
            .build(project.getId()).toString();

        return ProjectView.builder()
            .name(project.getName())
            .englishName(project.getEnglishName())
            .logoImageUrl(url)
            .memo(project.getMemo())
            .build();
    }
}
