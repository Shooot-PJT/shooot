package com.shooot.application.projecttest.service.query;

import com.shooot.application.projecttest.controller.dto.ProjectBuildView;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectVersion;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProjectBuildFindService {
    private final ProjectBuildRepository projectBuildRepository;

    @Transactional(readOnly = true)
    public List<ProjectBuildView> findAllByProjectId(Integer projectId){
        return projectBuildRepository.findAllByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public Boolean existFile(Integer projectId, String projectFileName, String md5CheckSum) {
        if(projectBuildRepository.existsByProject_IdAndFileNameAndMd5CheckSum(projectId, projectFileName, md5CheckSum)) {
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public Integer getTemporaryVersion(Integer projectId, String projectFileName, ProjectVersion projectVersion) {
        return projectBuildRepository.findAllByProjectNameAndVersionAndCheckSum(projectId, projectVersion.getMajor(), projectVersion.getMinor(), projectVersion.getPatch(), projectFileName).size();
    }

    @Transactional(readOnly = true)
    public ProjectBuildView findByProjectIdAndDeploymentTrue(Integer projectId) {
        Optional<ProjectBuild> byProjectIdAndIsDeploymentTrue = projectBuildRepository.findByProject_IdAndIsDeploymentTrue(projectId);
        return byProjectIdAndIsDeploymentTrue.map(ProjectBuildView::new).orElse(null);

    }
}
