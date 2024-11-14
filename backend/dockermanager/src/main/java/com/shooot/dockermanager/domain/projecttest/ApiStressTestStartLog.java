package com.shooot.dockermanager.domain.projecttest;

import com.shooot.dockermanager.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_stress_test_start_log")
@Entity
public class ApiStressTestStartLog extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_stress_test_start_log_id")
    private Long apiStressTestStartLogId;

    @Column(name = "project_participant_id")
    private Integer projectParticipantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_build_file_id")
    private ProjectBuild projectBuild;
}
