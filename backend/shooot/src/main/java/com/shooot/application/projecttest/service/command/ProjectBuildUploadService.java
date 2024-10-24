package com.shooot.application.projecttest.service.command;

import com.shooot.application.common.events.Events;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectFile;
import com.shooot.application.projecttest.domain.ProjectVersion;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.domain.repository.ProjectFileRepository;
import com.shooot.application.projecttest.event.dto.ProjectBuildUploadedEvent;
import com.shooot.application.projecttest.exception.FileIsExistException;
import com.shooot.application.projecttest.exception.FileIsNotJarFileException;
import com.shooot.application.projecttest.handler.ProjectFileHandler;
import com.shooot.application.projecttest.service.query.ProjectBuildFindService;
import com.shooot.application.utils.FileHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ProjectBuildUploadService {

    private final ProjectRepository projectRepository;
    private final ProjectBuildFindService projectBuildFindService;
    private final ProjectFileRepository projectFileRepository;
    private final ProjectBuildRepository projectBuildRepository;

    public Integer buildFileApiExtractor(Integer projectId, MultipartFile uploadedProjectFile, MultipartFile uploadedDockerComposeFile) {

        Project project = findProjectById(projectId);
        File jarFile = convertToFile(uploadedProjectFile, project.getName());
        String jarFileChecksum = FileHandler.getMD5Checksum(jarFile);

        Map<String, Object> fileInfos = extractJarInfo(jarFile);
        String projectFileName = (String) fileInfos.get(ProjectFileHandler.PROJECT_NAME);
        ProjectVersion projectVersion = (ProjectVersion) fileInfos.get(ProjectFileHandler.VERSION);

        validateDuplicateFile(projectId, projectFileName, jarFileChecksum);

        File dockerFile = convertToFile(uploadedDockerComposeFile, jarFile.getName());
        int temporaryVersion = getTemporaryVersion(projectId, projectFileName, projectVersion);
        projectVersion.setTemporary(temporaryVersion);

        ProjectBuild projectBuild = createProjectBuild(project, projectFileName, projectVersion);
        ProjectFile projectFile = createProjectFile(jarFile, dockerFile, projectBuild);

        projectBuild.setProjectFile(projectFile);

        Integer id = projectBuildRepository.save(projectBuild).getId();
        Events.raise(new ProjectBuildUploadedEvent(id, jarFile));
        return id;
    }

    private Project findProjectById(Integer projectId) {
        return projectRepository.findById(projectId)
                //TODO : Project ID Exception 작성할 것.
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) {
        return FileHandler.toFile(multipartFile, fileName)
                .orElseThrow(() -> new RuntimeException("Failed to convert file: " + fileName));
    }

    private Map<String, Object> extractJarInfo(File jarFile) {
        try {
            return ProjectFileHandler.extractJarInfo(jarFile.getAbsolutePath());
        } catch (IOException e) {
            throw new FileIsNotJarFileException();
        }
    }

    private void validateDuplicateFile(Integer projectId, String fileName, String checksum) {
        if (projectBuildFindService.existFile(projectId, fileName, checksum)) {
            throw new FileIsExistException();
        }
    }

    private int getTemporaryVersion(Integer projectId, String fileName, ProjectVersion version) {
        return projectBuildFindService.getTemporaryVersion(projectId, fileName, version);
    }

    private ProjectBuild createProjectBuild(Project project, String fileName, ProjectVersion version) {
        return ProjectBuild.builder()
                .fileName(fileName)
                .version(version)
                .isDeployment(false)
                .project(project)
                .build();
    }

    private ProjectFile createProjectFile(File jarFile, File dockerFile, ProjectBuild projectBuild) {
        return ProjectFile.builder()
                .projectFile(FileHandler.getAllBytes(jarFile))
                .fileName(jarFile.getName())
                .dockerComposeFile(FileHandler.getAllBytes(dockerFile))
                .projectBuild(projectBuild)
                .build();
    }
}
