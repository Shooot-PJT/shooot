package com.shooot.dockermanager.handler;


import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import org.springframework.beans.factory.annotation.Value;
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

    public void mergeDockerCompose(File dockerComposeFile, String englishProjectName, String instanceName, ProjectVersion projectVersion) {

        // Spring Boot에서 관리하는 Docker Compose 구성 설정
        Map<String, Object> springCompose = new HashMap<>();
        Map<String, Object> services = new HashMap<>();

        Map<String, Object> projectService = new HashMap<>();
        projectService.put("restart", "always");
        projectService.put("ports", List.of("808"+Integer.parseInt(instanceName.replace("instance", ""))+":8080"));
        Map<String, String> buildConfig = new HashMap<>();
        projectService.put("build", "./");
        projectService.put("image", "192.168.56.1:5000/"+englishProjectName+":"+projectVersion.toString());
        Map<String, Object> deployConfig = new HashMap<>();
        deployConfig.put("replicas", 1);
        deployConfig.put("placement", Map.of("constraints", List.of("node.hostname == " + instanceName)));

        Map<String, Object> restartPolicyConfig = new HashMap<>();
        restartPolicyConfig.put("condition", "on-failure");
        restartPolicyConfig.put("max_attempts", 10);

        deployConfig.put("restart_policy", restartPolicyConfig);

        projectService.put("networks", List.of("traefik"));

        Map<String, String> labels = new HashMap<>();
        labels.put("traefik.enable", "true");
        labels.put("traefik.http.routers." + englishProjectName+"_"+englishProjectName + ".rule", "Host(`" + englishProjectName + ".shooot.shop`)");
        labels.put("traefik.http.routers." + englishProjectName+"_"+englishProjectName + ".entrypoints", "websecure");
        labels.put("traefik.http.services." + englishProjectName+"_"+englishProjectName + ".loadbalancer.server.port", "8080");

        deployConfig.put("labels", labels);
        projectService.put("deploy", deployConfig);

        services.put(englishProjectName, projectService);
        springCompose.put("services", services);

        // 사용자 정의 Compose 파일 로드
        Yaml yaml = new Yaml(new Constructor(Map.class, new LoaderOptions()));
        Map<String, Object> userCompose;
        try (FileInputStream inputStream = new FileInputStream(dockerComposeFile)) {
            userCompose = yaml.load(inputStream);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Map<String, Object> userServices = (Map<String, Object>)userCompose.get("services");

        Map<String, Object> userDeployConfig = Map.of("replicas", 1, "placement", Map.of("constraints", List.of("node.hostname == " + instanceName)));

        for (Map.Entry<String, Object> entry : userServices.entrySet()) {
            Map<String, Object> maps = (Map<String, Object>) entry.getValue();
            maps.put("deploy", userDeployConfig);
        }


        // 사용자 정의 Compose와 Spring Compose 병합
        Map<String, Object> mergedServices = (Map<String, Object>) userCompose.getOrDefault("services", new HashMap<>());
        mergedServices.putAll((Map<String, Object>) springCompose.get("services"));
        userCompose.put("services", mergedServices);
        userCompose.put("networks", Map.of("traefik", Map.of("external", true)));
        userCompose.put("version", "3.8");
        // YAML 파일로 저장
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        Representer representer = new Representer(new DumperOptions());
        Yaml outputYaml = new Yaml(representer, options);

        try (FileWriter writer = new FileWriter(dockerComposeFile)) {
            outputYaml.dump(userCompose, writer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

}
