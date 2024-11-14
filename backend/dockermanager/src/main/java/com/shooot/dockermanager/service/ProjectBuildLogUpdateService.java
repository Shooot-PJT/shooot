package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.ProjectBuildLog;
import com.shooot.dockermanager.domain.projecttest.ProjectBuildStatus;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildLogRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectBuildLogUpdateService {
    private final ProjectBuildLogRepository projectBuildLogRepository;
    private final ProjectBuildRepository projectBuildRepository;

    @Transactional
    public void projectBuildLogUpdate(Integer projectJarFileId, ProjectBuildStatus status) {
        ProjectBuildLog projectBuildLog = projectBuildLogRepository.findByProjectBuild_Id(projectJarFileId).orElseGet(() -> ProjectBuildLog.builder().projectBuild(projectBuildRepository.getReferenceById(projectJarFileId)).build());
        projectBuildLog.updateStatus(status);
        projectBuildLogRepository.save(projectBuildLog);
    }
}
