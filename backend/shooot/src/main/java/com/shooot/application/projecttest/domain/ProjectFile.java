package com.shooot.application.projecttest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class ProjectFile {
    @Getter
    @Id
    @Column(name = "project_build_id")
    private Integer Id;

    @Getter
    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_build_id")
    private ProjectBuild projectBuild;


    @Lob
    @Column(name = "project_file")
    private byte[] projectFile;


    @Lob
    @Column(name = "docker_compose_file")
    private byte[] dockerComposeFile;

    @Getter
    @Column(name = "file_name")
    private String fileName;


    public void updateDockerComposeFile(byte[] files) {
        this.dockerComposeFile = files;
    }
}
