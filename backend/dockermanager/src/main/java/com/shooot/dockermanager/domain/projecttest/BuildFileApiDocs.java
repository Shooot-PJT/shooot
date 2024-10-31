package com.shooot.dockermanager.domain.projecttest;


import com.shooot.dockermanager.domain.api.Api;
import jakarta.persistence.*;
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
    @JoinColumn(name = "project_build_file_id")
    private ProjectBuild projectBuild;

    @Column(name = "url")
    private String url;

    @Column(name = "method")
    private String method;


}
