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

    @Column(name = "http_method")
    private String httpMethod;

    @Column(name = "url")
    private String url;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "vuser")
    private Integer vUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "test_method")
    private BuildFileTestMethod testMethod;

    @Column(name = "avg_cpu")
    private Double avgCpu;

    @Column(name = "max_cpu")
    private Double maxCpu;

    @Column(name = "min_cpu")
    private Double minCpu;

    @Column(name = "avg_memory")
    private Double avgMemory;

    @Column(name = "max_memory")
    private Double maxMemory;

    @Column(name = "min_memory")
    private Double minMemory;

    @Column(name = "avg_disk")
    private Double avgDisk;

    @Column(name = "max_disk")
    private Double maxDisk;

    @Column(name = "min_disk")
    private Double minDisk;

    @Column(name = "avg_network")
    private Double avgNetwork;

    @Column(name = "max_network")
    private Double maxNetwork;

    @Column(name = "min_network")
    private Double minNetwork;
}
