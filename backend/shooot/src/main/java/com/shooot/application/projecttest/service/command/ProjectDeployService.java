package com.shooot.application.projecttest.service.command;

import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.exception.ProjectBuildNotFoundException;
import com.shooot.application.projecttest.service.dto.ProjectBuildIdDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class ProjectDeployService {
    private final ProjectBuildRepository projectBuildRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String DOCKER_SERVER_DEPLOY_START_REQUEST_ENDPOINT = "http://khj745700.iptime.org:8080/project/start";
    private static final String DOCKER_SERVER_DEPLOY_STOP_REQUEST_ENDPOINT = "http://khj745700.iptime.org:8080/project/stop";

    public void projectDeployStartRequest(ProjectBuildIdDto dto) {
        ProjectBuild projectBuild = projectBuildRepository.findById(dto.getProjectJarFileId()).orElseThrow(ProjectBuildNotFoundException::new);
        restTemplate.postForObject(DOCKER_SERVER_DEPLOY_START_REQUEST_ENDPOINT, new RequestBody(projectBuild.getProject().getId(), dto.getProjectJarFileId()), Void.class);
    }

    public void projectDeployStopRequest(ProjectBuildIdDto dto) {
        ProjectBuild projectBuild = projectBuildRepository.findById(dto.getProjectJarFileId()).orElseThrow(ProjectBuildNotFoundException::new);
        restTemplate.postForObject(DOCKER_SERVER_DEPLOY_STOP_REQUEST_ENDPOINT, new RequestBody(projectBuild.getProject().getId(), dto.getProjectJarFileId()), Void.class);
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    private static final class RequestBody {
        private Integer projectId;
        private Integer projectJarFileId;
    }
}
