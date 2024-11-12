package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.project.domain.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_build")
@Entity
@SQLRestriction("is_deleted = false")
public class ProjectBuild extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_build_id")
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


    @OneToOne(mappedBy = "projectBuild", cascade = CascadeType.ALL)
    private ProjectBuildLog projectBuildLog;
}
