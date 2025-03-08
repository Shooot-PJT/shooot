package com.shooot.dockermanager.support;

import com.shooot.dockermanager.exception.definition.InstanceIsFullException;
import com.shooot.dockermanager.vagrant.VagrantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class InstanceManager {
    private final VagrantRepository vagrantRepository;
    private static final Map<String, String> HOSTS = Map.of(
            "instance1", "192.168.56.10:8082",
            "instance2", "192.168.56.11:8083",
            "instance3", "192.168.56.12:8084",
            "instance4", "192.168.56.13:8085"
    );

    public String getAvailableInstance() {
        String target = vagrantRepository.getFirstEmptyInstance();
        if (target == null) throw new InstanceIsFullException();
        return target;
    }

    public void assignInstance(String target, MetaData metaData) {
        vagrantRepository.put(target, metaData);
    }

    public void releaseInstance(String target) {
        vagrantRepository.remove(target);
    }

    public String getHealthCheckUrl(String target) {
        return "http://" + HOSTS.get(target) + "/actuator/health";
    }
}