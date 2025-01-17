package com.shooot.dockermanager.domain.projecttest;

import com.shooot.dockermanager.jpa.BaseEntity;
import com.shooot.dockermanager.jpa.uuid.UUIDv7;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_build_log")
@Entity
public class ProjectBuildLog extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "project_build_log_id")
    @UUIDv7
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_build_id")
    private ProjectBuild projectBuild;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProjectBuildStatus status;

    public void updateStatus(ProjectBuildStatus status) {
        this.status = status;
    }


    public Boolean isDeploy() {
        return status != null && status.equals(ProjectBuildStatus.RUN);
    }
}
