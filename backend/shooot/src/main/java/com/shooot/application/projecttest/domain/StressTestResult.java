package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StressTestResult extends SoftDeleteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stress_test_result_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stress_test_log_id")
    private StressTestLog stressTestLog;

    private String httpMethod;
    private String url;

    private Integer duration;
    private Integer vUser;

    @Enumerated(EnumType.STRING)
    private BuildFileTestMethod testMethod;

    private Double avgCpu;
    private Double maxCpu;
    private Double minCpu;

    private Double avgMemory;
    private Double maxMemory;
    private Double minMemory;

    private Double avgDisk;
    private Double maxDisk;
    private Double minDisk;

    private Double avgNetwork;
    private Double maxNetwork;
    private Double minNetwork;
}
