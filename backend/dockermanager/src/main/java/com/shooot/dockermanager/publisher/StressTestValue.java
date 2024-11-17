package com.shooot.dockermanager.publisher;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestValue {

    private Double cpu;
    private Double memory;
    private Double disk;
    private Double network;

    public void add(StressTestValue stressTestValue) {
        cpu += stressTestValue.getCpu();
        memory += stressTestValue.getMemory();
        disk += stressTestValue.getDisk();
        network += stressTestValue.getNetwork();
    }

    public void min(StressTestValue stressTestValue) {
        cpu = Math.min(cpu, stressTestValue.getCpu());
        memory = Math.min(memory, stressTestValue.getMemory());
        disk = Math.min(disk, stressTestValue.getDisk());
        network = Math.min(network, stressTestValue.getNetwork());
    }

    public void max(StressTestValue stressTestValue) {
        cpu = Math.max(cpu, stressTestValue.getCpu());
        memory = Math.max(memory, stressTestValue.getMemory());
        disk = Math.max(disk, stressTestValue.getDisk());
        network = Math.max(network, stressTestValue.getNetwork());
    }
}
