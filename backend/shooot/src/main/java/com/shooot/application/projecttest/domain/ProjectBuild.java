package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.project.domain.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_test")
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

}
