package com.shooot.dockermanager.handler;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.LoaderOptions;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;
import org.yaml.snakeyaml.representer.Representer;

import java.io.*;

import java.util.HashMap;
import java.util.Map;

@Component
public class DockerComposeManager {

    @Value("${vagrant.max-size}")
    private Integer maxSize;

    public void mergeDockerCompose(File dockerComposeFile, String englishProjectName, int portSuffix) {
        if(portSuffix < 2 || portSuffix > 2 + maxSize) {
            throw new IllegalArgumentException("port Suffix는 2이상 maxSize + 2 이하여야 합니다. , : " + portSuffix);
        }

        // Spring Boot에서 관리하는 Docker Compose 구성 설정
        Map<String, Object> springCompose = new HashMap<>();
        Map<String, Object> services = new HashMap<>();

        Map<String, Object> projectService = new HashMap<>();
        projectService.put("container_name", englishProjectName);
        projectService.put("ports", new String[]{"808" + portSuffix + ":8080"});

        Map<String, String> buildConfig = new HashMap<>();
        buildConfig.put("context", ".");
        buildConfig.put("dockerfile", "Dockerfile");
        projectService.put("build", buildConfig);

        Map<String, String> labels = new HashMap<>();
        labels.put("traefik.enable", "true");
        labels.put("traefik.http.routers." + englishProjectName + ".rule", "Host(`" + englishProjectName + ".shooot.shop`)");
        labels.put("traefik.http.routers." + englishProjectName + ".entrypoints", "websecure");
        labels.put("traefik.http.routers." + englishProjectName + ".loadbalancer.server.port=", "808"+portSuffix);
        projectService.put("labels", labels);

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

        // 사용자 정의 Compose와 Spring Compose 병합
        Map<String, Object> mergedCompose = new HashMap<>(userCompose);
        mergedCompose.putAll(springCompose);

        // YAML 파일로 저장
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        Representer representer = new Representer(new DumperOptions());
        Yaml outputYaml = new Yaml(representer, options);

        try (FileWriter writer = new FileWriter(dockerComposeFile)) {
            outputYaml.dump(mergedCompose, writer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

}
