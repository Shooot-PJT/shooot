package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import com.shooot.dockermanager.support.ProcessExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
@Service
public class DockerDeployService {
    private final ProcessExecutor processExecutor;

    public void deployStack(Project project, ProjectBuild projectBuild,
                            File projectDirectory, String target) throws IOException, InterruptedException {
        processExecutor.executeProcess(
                new ProcessBuilder("docker", "stack", "deploy", "-c",
                        "docker-compose.yml", project.getEnglishName())
                        .directory(projectDirectory),
                "Docker Compose deployment",
                target);
    }

    public void removeStack(String projectName) {
        try {
            processExecutor.executeProcess("docker", "stack", "rm", projectName);
        } catch (Exception e) {
            log.warn("Error removing stack for {}: {}", projectName, e.getMessage());
            // 오류 무시하고 계속 진행
        }
    }
}