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
public class DockerBuildService {
    private final ProcessExecutor processExecutor;

    public void buildAndTagImage(Project project, ProjectBuild projectBuild,
                                 File projectDirectory, String target) throws IOException, InterruptedException {
        // 이미지 빌드
        processExecutor.executeProcess(
                new ProcessBuilder("docker", "build", "-t",
                        project.getEnglishName() + ":" + projectBuild.getVersion(), ".")
                        .directory(projectDirectory),
                "Docker build image",
                target);

        // 이미지 태그
        processExecutor.executeProcess(
                new ProcessBuilder("docker", "tag",
                        project.getEnglishName() + ":" + projectBuild.getVersion(),
                        "192.168.56.1:5000/" + project.getEnglishName() + ":" + projectBuild.getVersion()),
                "Docker image tag",
                target);

        // 이미지 푸시
        processExecutor.executeProcess(
                new ProcessBuilder("docker", "push",
                        "192.168.56.1:5000/" + project.getEnglishName() + ":" + projectBuild.getVersion()),
                "Docker image push",
                target);
    }
}