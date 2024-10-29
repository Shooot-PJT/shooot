package com.shooot.application.projecttest.controller.dto;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.projecttest.domain.BuildFileApiDocs;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Setter
@Getter
@AllArgsConstructor
public class ProjectApiDocsForTestView {
    private List<Include> includes;
    private List<Exclude> excludes;

    public ProjectApiDocsForTestView() {
        this.includes = new ArrayList<>();
        this.excludes = new ArrayList<>();
    }

    public void putInclude(Include include) {
        includes.add(include);
    }

    public void putExclude(Exclude exclude) {
        excludes.add(exclude);
    }


    @Setter
    @Getter
    @NoArgsConstructor
    public static class Include {
        private Integer testingApiId;
        private String domainName;
        private String method;
        private String endPoint;
        private String description;
        private Integer vuser;
        private Integer duration;

        @Builder
        public Include(Domain domain, BuildFileApiDocs buildFileApiDocs) {
            this.testingApiId = buildFileApiDocs.getId();
            this.domainName = domain.getName();
            this.method = buildFileApiDocs.getApi().getMethod();
            this.endPoint = buildFileApiDocs.getUrl();
            this.description = buildFileApiDocs.getApi().getDescription();
            this.vuser = 10;
            this.duration = 1;
        }
    }

    @Builder
    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Exclude {
        private String method;
        private String endPoint;
    }
}

