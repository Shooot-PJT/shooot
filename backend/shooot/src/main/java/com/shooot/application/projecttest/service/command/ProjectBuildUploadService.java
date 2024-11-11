package com.shooot.application.projecttest.service.command;

import com.shooot.application.common.events.Events;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectBuildLog;
import com.shooot.application.projecttest.domain.ProjectFile;
import com.shooot.application.projecttest.domain.ProjectVersion;
import com.shooot.application.projecttest.domain.repository.ProjectBuildLogRepository;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.domain.repository.ProjectFileRepository;
import com.shooot.application.projecttest.event.dto.ProjectBuildUploadedEvent;
import com.shooot.application.projecttest.exception.FileIsDeploymentException;
import com.shooot.application.projecttest.exception.FileIsExistException;
import com.shooot.application.projecttest.exception.FileIsNotExistException;
import com.shooot.application.projecttest.exception.FileIsNotJarFileException;
import com.shooot.application.projecttest.handler.DockerComposeValidator;
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

    private final ProjectFileRepository projectFileRepository;
    private final ProjectRepository projectRepository;
    private final ProjectBuildFindService projectBuildFindService;
    private final ProjectBuildRepository projectBuildRepository;
    private final DockerComposeValidator dockerComposeValidator;
    private final ProjectBuildLogRepository projectBuildLogRepository;

    public Integer buildFileApiExtractor(Integer projectId, MultipartFile uploadedProjectFile, MultipartFile uploadedDockerComposeFile) {
        File dockerFile = null;
        if(!uploadedProjectFile.isEmpty()){
            dockerFile = convertToFile(uploadedDockerComposeFile, "docker-compose.yml");
            dockerComposeValidator.validateComposeFile(dockerFile.getAbsolutePath());
        }

        Project project = findProjectById(projectId);

        File jarFile = convertToFile(uploadedProjectFile, project.getName());
        String jarFileChecksum = FileHandler.getMD5Checksum(jarFile);

        Map<String, Object> fileInfos = extractJarInfo(jarFile);
        String projectFileName = (String) fileInfos.get(ProjectFileHandler.PROJECT_NAME);
        ProjectVersion projectVersion = (ProjectVersion) fileInfos.get(ProjectFileHandler.VERSION);

        validateDuplicateFile(projectId, projectFileName, jarFileChecksum);


        int temporaryVersion = getTemporaryVersion(projectId, projectFileName, projectVersion);
        projectVersion.setTemporary(temporaryVersion);

        ProjectBuild projectBuild = createProjectBuild(project, projectFileName, projectVersion, jarFileChecksum);
        ProjectFile projectFile = createProjectFile(jarFile, projectFileName, dockerFile, projectBuild);

        projectFileRepository.save(projectFile);

        Integer id = projectBuildRepository.save(projectBuild).getId();
        Events.raise(new ProjectBuildUploadedEvent(id, jarFile));
        return id;
    }

    public void dockerFileUpdate(Integer projectJarFileId, MultipartFile uploadedDockerComposeFile) {
        ProjectBuild pb = projectBuildRepository.findById(projectJarFileId).orElseThrow(FileIsNotExistException::new);
        ProjectFile pf = projectFileRepository.findById(pb.getId()).orElseThrow(FileIsNotExistException::new);
        ProjectBuildLog projectBuildLog = projectBuildLogRepository.findByProjectBuild_Id(pb.getId()).orElseThrow(FileIsNotExistException::new);

        if(projectBuildLog.isDeploy()) {
            throw new FileIsDeploymentException();
        }

        File dockerComposeFile = convertToFile(uploadedDockerComposeFile, "docker-compose.yml");
        dockerComposeValidator.validateComposeFile(dockerComposeFile.getAbsolutePath());

        pf.updateDockerComposeFile(FileHandler.getAllBytes(dockerComposeFile));
        projectFileRepository.save(pf);
    }

    private Project findProjectById(Integer projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);
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

    private ProjectBuild createProjectBuild(Project project, String fileName, ProjectVersion version, String md5CheckSum) {
        return ProjectBuild.builder()
                .fileName(fileName)
                .version(version)
                .isDeployment(false)
                .project(project)
                .md5CheckSum(md5CheckSum)
                .build();
    }

    private ProjectFile createProjectFile(File jarFile, String projectFileName, File dockerFile, ProjectBuild projectBuild) {
        return ProjectFile.builder()
                .projectFile(FileHandler.getAllBytes(jarFile))
                .fileName(projectFileName)
                .dockerComposeFile(FileHandler.getAllBytes(dockerFile))
                .projectBuild(projectBuild)
                .build();
    }
}
