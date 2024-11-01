package com.shooot.dockermanager.listener;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import com.shooot.dockermanager.domain.projecttest.ProjectFile;
import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectFileRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectRepository;
import com.shooot.dockermanager.handler.ProjectFileHandler;
import com.shooot.dockermanager.utils.FileHandler;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@AllArgsConstructor
@Component
public class DummyDataBuilder implements ApplicationListener<ContextRefreshedEvent> {

    private final ProjectFileRepository projectFileRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private final ProjectRepository projectRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createDummyProjectBuild();
    }


    private void createDummyProjectBuild() {
        createProjectBuildIfNotNull(1, 1, "C:\\Users\\SSAFY\\Desktop\\dummy-0.0.1-SNAPSHOT.jar", "/home/hyunjinkim/deployment/dummy/dummy/docker-compose.yml");
    }


    private void createProjectBuildIfNotNull(Integer id, Integer projectId, String jarFilePath, String dockerComposeFilePath) {

        if(projectBuildRepository.findById(id).isPresent()){
            return;
        }

        Project project = findProjectById(projectId);
        File jarFile = new File(jarFilePath);
        String jarFileChecksum = FileHandler.getMD5Checksum(jarFile);
        System.out.println("jarFileChecksum = " + jarFileChecksum);
        Map<String, Object> fileInfos = extractJarInfo(jarFile);
        String projectFileName = (String) fileInfos.get(ProjectFileHandler.PROJECT_NAME);
        ProjectVersion projectVersion = (ProjectVersion) fileInfos.get(ProjectFileHandler.VERSION);

        File dockerFile = new File(dockerComposeFilePath);
        int temporaryVersion = 0;
        projectVersion.setTemporary(temporaryVersion);

        ProjectBuild projectBuild = createProjectBuild(project, projectFileName, projectVersion, jarFileChecksum);
        ProjectFile projectFile = createProjectFile(jarFile, dockerFile, projectBuild);

        projectBuild.setProjectFile(projectFile);

        projectBuildRepository.save(projectBuild);

    }


    private Map<String, Object> extractJarInfo(File jarFile) {
        try {
            return ProjectFileHandler.extractJarInfo(jarFile.getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    private ProjectFile createProjectFile(File jarFile, File dockerFile, ProjectBuild projectBuild) {
        return ProjectFile.builder()
                .projectFile(FileHandler.getAllBytes(jarFile))
                .fileName(jarFile.getName())
                .dockerComposeFile(FileHandler.getAllBytes(dockerFile))
                .projectBuild(projectBuild)
                .build();
    }


    private Project findProjectById(Integer projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
    }

    private ProjectBuild createProjectBuild(Project project, String fileName, ProjectVersion version, String md5CheckSum) {
        return ProjectBuild.builder()
                .fileName(fileName)
                .version(version)
                .isDeployment(false)
                .project(project)
                .md5CheckSum(md5CheckSum)
                .build();
    }
}
