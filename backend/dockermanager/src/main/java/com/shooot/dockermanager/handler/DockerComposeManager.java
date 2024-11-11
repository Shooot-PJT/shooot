package com.shooot.dockermanager.handler;

import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.LoaderOptions;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;
import org.yaml.snakeyaml.representer.Representer;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DockerComposeManager {

    private static final String RESTART_POLICY = "on-failure";
    private static final int MAX_RESTART_ATTEMPTS = 10;
    private static final String NETWORK_TRAEFIK = "traefik";
    private static final String NETWORK_INTERNAL = "internal_network";
    private static final String DEFAULT_VERSION = "3.8";
    private static final String HOST_DOMAIN = ".shooot.shop";
    private static final String DOCKER_REGISTRY = "192.168.56.1:5000/";

    public void mergeDockerCompose(File dockerComposeFile, String projectName, String instanceName, ProjectVersion projectVersion) {
        Map<String, Object> springCompose = createSpringCompose(projectName, instanceName, projectVersion);
        Map<String, Object> userCompose = loadYamlFile(dockerComposeFile);

        mergeComposes(userCompose, springCompose, instanceName, projectName);
        saveYamlToFile(userCompose, dockerComposeFile);
    }

    private Map<String, Object> createSpringCompose(String projectName, String instanceName, ProjectVersion projectVersion) {
        Map<String, Object> services = new HashMap<>();
        services.put(projectName, createProjectServiceConfig(projectName, instanceName, projectVersion));

        Map<String, Object> springCompose = new HashMap<>();
        springCompose.put("services", services);
        return springCompose;
    }

    private Map<String, Object> createProjectServiceConfig(String projectName, String instanceName, ProjectVersion projectVersion) {
        Map<String, Object> serviceConfig = new HashMap<>();
        serviceConfig.put("restart", "always");
        serviceConfig.put("ports", List.of("808" + extractInstanceNumber(instanceName) + ":8080"));
        serviceConfig.put("image", DOCKER_REGISTRY + projectName + ":" + projectVersion);
        serviceConfig.put("networks", List.of(NETWORK_TRAEFIK, NETWORK_INTERNAL));
        serviceConfig.put("deploy", createDeployConfig(instanceName, projectName));

        return serviceConfig;
    }

    private int extractInstanceNumber(String instanceName) {
        return Integer.parseInt(instanceName.replace("instance", "") + 1);
    }

    private Map<String, Object> createDeployConfig(String instanceName, String projectName) {
        Map<String, Object> deployConfig = new HashMap<>();
        deployConfig.put("replicas", 1);
        deployConfig.put("placement", Map.of("constraints", List.of("node.hostname == " + instanceName)));
        deployConfig.put("restart_policy", Map.of("condition", RESTART_POLICY, "max_attempts", MAX_RESTART_ATTEMPTS));
        deployConfig.put("labels", createTraefikLabels(projectName));

        return deployConfig;
    }

    private Map<String, String> createTraefikLabels(String projectName) {
        return Map.of(
                "traefik.enable", "true",
                "traefik.http.routers." + projectName + "_" + projectName + ".rule", "Host(`" + projectName + HOST_DOMAIN + "`)",
                "traefik.http.routers." + projectName + "_" + projectName + ".entrypoints", "websecure",
                "traefik.http.services." + projectName + "_" + projectName + ".loadbalancer.server.port", "8080"
        );
    }

    private Map<String, Object> loadYamlFile(File file) {
        Yaml yaml = new Yaml(new Constructor(Map.class, new LoaderOptions()));
        try (FileInputStream inputStream = new FileInputStream(file)) {
            return yaml.load(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load YAML file", e);
        }
    }

    private void mergeComposes(Map<String, Object> userCompose, Map<String, Object> springCompose, String instanceName, String projectName) {
        Map<String, Object> userServices = (Map<String, Object>) userCompose.getOrDefault("services", new HashMap<>());
        applyUserDeployConfig(userServices, instanceName);

        userServices.putAll((Map<String, Object>) springCompose.get("services"));
        userCompose.put("services", userServices);
        userCompose.put("networks", createNetworksConfig());
        userCompose.put("version", DEFAULT_VERSION);
    }

    private void applyUserDeployConfig(Map<String, Object> userServices, String instanceName) {
        Map<String, Object> userDeployConfig = Map.of(
                "replicas", 1,
                "placement", Map.of("constraints", List.of("node.hostname == " + instanceName))
        );

        for (Map.Entry<String, Object> entry : userServices.entrySet()) {
            Map<String, Object> serviceConfig = (Map<String, Object>) entry.getValue();
            serviceConfig.put("deploy", userDeployConfig);
            serviceConfig.put("networks", List.of(NETWORK_INTERNAL));
        }
    }

    private Map<String, Object> createNetworksConfig() {
        return Map.of(
                NETWORK_TRAEFIK, Map.of("external", true),
                NETWORK_INTERNAL, Map.of("driver", "overlay")
        );
    }

    private void saveYamlToFile(Map<String, Object> data, File file) {
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        Yaml yaml = new Yaml(new Representer(options), options);

        try (FileWriter writer = new FileWriter(file)) {
            yaml.dump(data, writer);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save YAML file", e);
        }
    }
}
