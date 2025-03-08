package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectFile;
import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import com.shooot.dockermanager.support.DockerComposeManager;
import com.shooot.dockermanager.support.MetaData;
import com.shooot.dockermanager.support.ProjectDirectoryManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;

@RequiredArgsConstructor
@Slf4j
@Service
public class ProjectFileService {
    private final ProjectDirectoryManager projectDirectoryManager;
    private final DockerComposeManager dockerComposeManager;

    public MetaData setupProjectDirectory(Integer projectId, Integer projectJarFileId,
                                      ProjectFile projectFile, Project project,
                                      String target, ProjectVersion projectVersion) throws IOException {
        // 디렉토리 생성
        projectDirectoryManager.mkDir(projectId, projectJarFileId);

        // 파일 복사
        projectDirectoryManager.setFile(projectId, projectJarFileId,
                ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE,
                projectFile.getDockerComposeFile());

        projectDirectoryManager.setFile(projectId, projectJarFileId,
                ProjectDirectoryManager.DirStructure.JAR,
                projectFile.getProjectFile());

        // 메타데이터 설정
        MetaData metaData = MetaData.builder()
                .projectJarFileId(projectJarFileId)
                .projectId(projectId)
                .projectName(project.getEnglishName())
                .instanceName(target)
                .build();

        projectDirectoryManager.setMetaData(projectId, projectJarFileId, metaData);

        // Dockerfile 복사
        copyDockerfile(projectId, projectJarFileId);

        // Docker Compose 파일 병합
        dockerComposeManager.mergeDockerCompose(
                projectDirectoryManager.getFile(projectId, projectJarFileId,
                                ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE)
                        .orElseThrow(IllegalArgumentException::new),
                project.getEnglishName(),
                target,
                projectVersion);

        return metaData;
    }

    private void copyDockerfile(Integer projectId, Integer projectJarFileId) throws IOException {
        File copyTargetFile = new File("/home/hyunjinkim/deployment/scripts/Dockerfile");
        File copyDir = new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/"
                + projectId + "/" + projectJarFileId + "/Dockerfile");

        try (FileInputStream fis = new FileInputStream(copyTargetFile);
             FileOutputStream fos = new FileOutputStream(copyDir)) {
            fos.write(fis.readAllBytes());
        }
    }

    public MetaData getMetaData(Integer projectId, Integer projectJarFileId) {
        return projectDirectoryManager.getMetaData(
                Path.of(projectDirectoryManager.file(projectId, projectJarFileId).getPath())
        );
    }

    public void cleanupProjectDirectory(Integer projectId, Integer projectJarFileId) {
        projectDirectoryManager.rmDir(projectId, projectJarFileId);
    }

    public File getProjectDirectory(Integer projectId, Integer projectJarFileId) {
        return new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/"
                + projectId + "/" + projectJarFileId);
    }
}
