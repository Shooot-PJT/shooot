package com.shooot.application.projecttest.service.command;

import com.shooot.application.common.infra.storage.exception.FileNotFoundException;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectBuildLog;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.exception.FileIsDeploymentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectBuildRemoveService {
    private final ProjectBuildRepository projectBuildRepository;

    @Transactional
    public void removeProjectBuild(Integer projectJarFileId) {
        ProjectBuild projectBuild = projectBuildRepository.findById(projectJarFileId).orElseThrow(FileNotFoundException::new);
        ProjectBuildLog projectBuildLog = projectBuild.getProjectBuildLog();

        if(projectBuildLog != null && projectBuildLog.isDeploy()) {
            throw new FileIsDeploymentException();
        }

        projectBuild.delete();
    }
}
