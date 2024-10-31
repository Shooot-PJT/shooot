package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.BaseEntity;
import com.shooot.application.project.domain.ProjectParticipant;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_participant_id")
    private ProjectParticipant projectParticipant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_build_file_id")
    private ProjectBuild projectBuild;
}
