package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.BaseEntity;
import com.shooot.application.common.jpa.uuid.UUIDv7;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class ProjectTestMetricLog extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "test_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "build_file_api_docs_id")
    private BuildFileApiDocs buildFileApiDocs;

    @Column(name = "avg_cpu_utilization")
    private Float avgCpuUtilization;

    @Column(name = "max_cpu_utilization")
    private Float maxCpuUtilization;

    @Column(name = "min_cpu_utilization")
    private Float minCpuUtilization;

    @Column(name = "avg_ram_utilization")
    private Float avgRamUtilization;

    @Column(name = "max_ram_utilization")
    private Float maxRamUtilization;

    @Column(name = "min_ram_utilization")
    private Float minRamUtilization;

    @Column(name = "avg_network_utilization")
    private Float avgNetworkUtilization;

    @Column(name = "max_network_utilization")
    private Float maxNetworkUtilization;

    @Column(name = "min_network_utilization")
    private Float minNetworkUtilization;

    @Column(name = "avg_disk_utilization")
    private Float avgDiskUtilization;

    @Column(name = "max_disk_utilization")
    private Float maxDiskUtilization;

    @Column(name = "min_disk_utilization")
    private Float minDiskUtilization;

    @Column(name = "avg_jvm_memory_usage")
    private Float avgJvmMemoryUsage;

    @Column(name = "max_jvm_memory_usage")
    private Float maxJvmMemoryUsage;

    @Column(name = "min_jvm_memory_usage")
    private Float minJvmMemoryUsage;

    @Column(name = "avg_gc_pause_time")
    private Float avgGcPauseTime;

    @Column(name = "max_gc_pause_time")
    private Float maxGcPauseTime;

    @Column(name = "min_gc_pause_time")
    private Float minGcPauseTime;

    @Column(name = "avg_thread_count")
    private Short avgThreadCount;

    @Column(name = "max_thread_count")
    private Short maxThreadCount;

    @Column(name = "min_thread_count")
    private Short minThreadCount;

    @Column(name = "avg_request_count")
    private Long avgRequestCount;

    @Column(name = "max_request_count")
    private Long maxRequestCount;

    @Column(name = "min_request_count")
    private Long minRequestCount;

    @Column(name = "avg_heap_memory_usage")
    private Float avgHeapMemoryUsage;

    @Column(name = "max_heap_memory_usage")
    private Float maxHeapMemoryUsage;

    @Column(name = "min_heap_memory_usage")
    private Float minHeapMemoryUsage;

    @Column(name = "avg_non_heap_memory_usage")
    private Float avgNonHeapMemoryUsage;

    @Column(name = "max_non_heap_memory_usage")
    private Float maxNonHeapMemoryUsage;

    @Column(name = "min_non_heap_memory_usage")
    private Float minNonHeapMemoryUsage;

    @Column(name = "avg_cache_hits")
    private Long avgCacheHits;

    @Column(name = "max_cache_hits")
    private Long maxCacheHits;

    @Column(name = "min_cache_hits")
    private Long minCacheHits;

    @Column(name = "avg_cache_misses")
    private Long avgCacheMisses;

    @Column(name = "max_cache_misses")
    private Long maxCacheMisses;

    @Column(name = "min_cache_misses")
    private Long minCacheMisses;

    @Column(name = "avg_active_connections")
    private Short avgActiveConnections;

    @Column(name = "max_active_connections")
    private Short maxActiveConnections;

    @Column(name = "min_active_connections")
    private Short minActiveConnections;

    @Column(name = "avg_total_connections")
    private Short avgTotalConnections;

    @Column(name = "max_total_connections")
    private Short maxTotalConnections;

    @Column(name = "min_total_connections")
    private Short minTotalConnections;
}
