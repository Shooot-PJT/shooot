package com.shooot.application.projecttest.controller.dto;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.projecttest.domain.ApiTestMethod;
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
        private Integer apiId;
        private String domainName;
        private String method;
        private String endPoint;
        private String description;
        private Integer vuser;
        private Integer duration;
        private String testMethod;

        @Builder
        public Include(ApiTestMethod apiTestMethod) {
            Api api = apiTestMethod.getApi();
            this.apiId = api.getId();
            this.domainName = api.getDomain().getName();
            this.method = api.getMethod();
            this.endPoint = api.getUrl();
            this.description = api.getDescription();
            this.vuser = apiTestMethod.getVUsers() != null ? apiTestMethod.getVUsers() : 10;
            this.duration = apiTestMethod.getTestDuration() == null ? 0 : apiTestMethod.getTestDuration();
            this.testMethod = apiTestMethod.getBuildFileTestMethod().name();
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

