package com.shooot.application.stresstest.controller.dto;

public class StressTestDto {

    private Float cpuUtilization;
    private Float ramUtilization;
    private Float networkUtilization;
    private Float diskUtilization;
    private Float jvmMemoryUsage;
    private Float gcPauseTime;
    private Short threadCount;
    private Long requestCount;
    private Float heapMemoryUsage;
    private Float nonHeapMemoryUsage;
    private Long cacheHits;
    private Long cacheMisses;
    private Short activeConnections;
    private Short totalConnections;
}
