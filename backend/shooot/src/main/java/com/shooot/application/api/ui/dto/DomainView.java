package com.shooot.application.api.ui.dto;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.project.domain.Project;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DomainView {
    private Integer domainId;
    private Integer projectId;
    private String title;
    private String description;
    private Boolean isSubscribe;

    public static DomainView from(Domain domain){
        return DomainView.builder()
                .domainId(domain.getId())
                .projectId(domain.getProject().getId())
                .title(domain.getName())
                .description(domain.getDescription())
                .build();
    }
}
