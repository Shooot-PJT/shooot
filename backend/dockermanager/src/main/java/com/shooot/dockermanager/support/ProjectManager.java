package com.shooot.dockermanager.support;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import com.shooot.dockermanager.domain.projecttest.ProjectBuildStatus;
import com.shooot.dockermanager.domain.projecttest.ProjectFile;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectFileRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectRepository;
import com.shooot.dockermanager.service.ProjectBuildLogUpdateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class ProjectManager {
    private final ProjectFileRepository projectFileRepository;
    private final ProjectRepository projectRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private final ProjectBuildLogUpdateService projectBuildLogUpdateService;

    public ProjectFile getProjectFile(Integer projectJarFileId) {
        return projectFileRepository.findById(projectJarFileId)
                .orElseThrow(IllegalArgumentException::new);
    }

    public Project getProject(Integer projectJarFileId) {
        return projectRepository.findByProjectJarFileId(projectJarFileId)
                .orElseThrow(IllegalArgumentException::new);
    }

    public ProjectBuild getProjectBuild(Integer projectJarFileId) {
        return projectBuildRepository.findById(projectJarFileId)
                .orElseThrow(IllegalArgumentException::new);
    }

    public void updateBuildStatus(Integer projectJarFileId, ProjectBuildStatus status) {
        projectBuildLogUpdateService.projectBuildLogUpdate(projectJarFileId, status);
    }
}