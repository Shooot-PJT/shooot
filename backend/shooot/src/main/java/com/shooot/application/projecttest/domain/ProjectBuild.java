package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.project.domain.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_build")
@Entity
public class ProjectBuild extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_build_file_id")
    private Integer id;

    @Embedded
    private ProjectVersion version;

    @Column(name = "is_deployment")
    private Boolean isDeployment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "md5_check_sum")
    private String md5CheckSum;

    @Setter
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "projectBuild", cascade = CascadeType.ALL)
    private ProjectFile projectFile;

    @OneToMany(mappedBy = "projectBuild", cascade = CascadeType.ALL)
    private List<ProjectBuildLog> projectBuildLog;
}
