package com.shooot.application.projecttest.service.command;

import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectBuildLog;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.exception.FileIsDeploymentException;
import com.shooot.application.projecttest.exception.FileIsNotExistException;
import com.shooot.application.projecttest.exception.InstanceIsFullException;
import com.shooot.application.projecttest.service.dto.ProjectBuildIdDto;
import com.shooot.application.projecttest.subscriber.ConsoleLogStreamSubscriber;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class ProjectDeployService {
    private final ProjectBuildRepository projectBuildRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ConsoleLogStreamSubscriber consoleLogStreamSubscriber;
    private static final String DOCKER_SERVER_DEPLOY_START_REQUEST_ENDPOINT = "http://khj745700.iptime.org:8080/project/start";
    private static final String DOCKER_SERVER_DEPLOY_STOP_REQUEST_ENDPOINT = "http://khj745700.iptime.org:8080/project/stop";
    @Transactional(readOnly = true)
    public void projectDeployStartRequest(ProjectBuildIdDto dto) {
        ProjectBuild projectBuild = projectBuildRepository.findById(dto.getProjectJarFileId()).orElseThrow(FileIsNotExistException::new);
        ProjectBuildLog pb = projectBuild.getProjectBuildLog();
        if (pb != null && pb.isDeploy()) {
            throw new FileIsDeploymentException();
        }

        try {
            consoleLogStreamSubscriber.addSubscriptionForProject(projectBuild.getProject().getId());
            restTemplate.postForObject(DOCKER_SERVER_DEPLOY_START_REQUEST_ENDPOINT, new RequestBody(projectBuild.getProject().getId(), dto.getProjectJarFileId()), Void.class);
        } catch (HttpClientErrorException e) {
            consoleLogStreamSubscriber.removeSubscriptionForProject(projectBuild.getProject().getId());
            throw new InstanceIsFullException();
        }



    }

    @Transactional(readOnly = true)
    public void projectDeployStopRequest(ProjectBuildIdDto dto) {
        ProjectBuild projectBuild = projectBuildRepository.findById(dto.getProjectJarFileId()).orElseThrow(FileIsNotExistException::new);
        restTemplate.postForObject(DOCKER_SERVER_DEPLOY_STOP_REQUEST_ENDPOINT, new RequestBody(projectBuild.getProject().getId(), dto.getProjectJarFileId()), Void.class);
        consoleLogStreamSubscriber.removeSubscriptionForProject(projectBuild.getProject().getId());
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    private static final class RequestBody {
        private Integer projectId;
        private Integer projectJarFileId;
    }
}
