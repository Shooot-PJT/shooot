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
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class ProjectTestMetricLog extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "build_file_api_docs_id")
    private BuildFileApiDocs buildFileApiDocs;

    @Column(name = "cpu_utilization")
    private Float cpuUtilization;

    @Column(name = "ram_utilization")
    private Float ramUtilization;

    @Column(name = "network_utilization")
    private Float networkUtilization;

    @Column(name = "disk_utilization")
    private Float diskUtilization;

    @Column(name = "jvm_memory_usage")
    private Float jvmMemoryUsage;

    @Column(name = "gc_pause_time")
    private Float gcPauseTime;

    @Column(name = "thread_count")
    private Short threadCount;

    @Column(name = "request_count")
    private Long requestCount;

    @Column(name = "heap_memory_usage")
    private Float heapMemoryUsage;

    @Column(name = "non_heap_memory_usage")
    private Float nonHeapMemoryUsage;

    @Column(name = "cache_hits")
    private Long cacheHits;

    @Column(name = "cache_misses")
    private Long cacheMisses;

    @Column(name = "active_connections")
    private Short activeConnections;

    @Column(name = "total_connections")
    private Short totalConnections;


}
