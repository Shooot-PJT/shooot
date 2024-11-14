package com.shooot.application.projecttest.domain;

import com.shooot.application.api.domain.Api;
import com.shooot.application.projecttest.handler.ApiInfoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "build_file_api_docs")
@Entity
public class BuildFileApiDocs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "build_file_api_docs_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_build_id")
    private ProjectBuild projectBuild;

    @Column(name = "url")
    private String url;

    @Column(name = "method")
    private String method;


    public static BuildFileApiDocs create(Api api, ApiInfoDto dto, ProjectBuild projectBuild) {
        return BuildFileApiDocs.builder().projectBuild(projectBuild)
            .api(api)
            .url(dto.getUrl())
            .method(dto.getMethod())
            .build();
    }

    public void updateApi(Api api) {
        this.api = api;
    }

}
