package com.shooot.dockermanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usage {

    private Double cpu;
    private Double memory;
    private Double disk;
    private Double network;

    public void add(Usage usage) {
        this.cpu += usage.getCpu();
        this.memory += usage.getMemory();
        this.disk += usage.getDisk();
        this.network += usage.getNetwork();
    }

    public void min(Usage usage) {
        this.cpu = Math.min(this.cpu, usage.getCpu());
        this.memory = Math.min(this.memory, usage.getMemory());
        this.disk = Math.min(this.disk, usage.getDisk());
        this.network = Math.min(this.network, usage.getNetwork());
    }

    public void max(Usage usage) {
        this.cpu = Math.max(this.cpu, usage.getCpu());
        this.memory = Math.max(this.memory, usage.getMemory());
        this.disk = Math.max(this.disk, usage.getDisk());
        this.network = Math.max(this.network, usage.getNetwork());
    }
}
