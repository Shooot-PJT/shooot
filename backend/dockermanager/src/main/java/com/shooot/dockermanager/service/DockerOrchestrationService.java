package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import com.shooot.dockermanager.domain.projecttest.ProjectBuildStatus;
import com.shooot.dockermanager.domain.projecttest.ProjectFile;
import com.shooot.dockermanager.dto.ServiceStartDto;
import com.shooot.dockermanager.dto.ServiceStopDto;
import com.shooot.dockermanager.support.MetaData;
import com.shooot.dockermanager.publisher.DockerConsoleLogMessage;
import com.shooot.dockermanager.publisher.DockerMessage;
import com.shooot.dockermanager.publisher.MessageDto;
import com.shooot.dockermanager.publisher.RedisMessagePublisher;
import com.shooot.dockermanager.support.InstanceManager;
import com.shooot.dockermanager.support.ProjectManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RequiredArgsConstructor
@Slf4j
@Service
public class DockerOrchestrationService {
    private final InstanceManager instanceManager;
    private final ProjectManager projectManager;
    private final ProjectFileService projectFileService;
    private final DockerBuildService dockerBuildService;
    private final DockerDeployService dockerDeployService;
    private final ServiceMonitoringService serviceMonitoringService;
    private final RedisMessagePublisher redisMessagePublisher;
    private final ExecutorService executorService = Executors.newFixedThreadPool(4);

    public boolean startService(ServiceStartDto dto) {
        String target = instanceManager.getAvailableInstance();
        executorService.submit(() -> startServiceProcess(dto, target));
        return true;
    }

    private void startServiceProcess(ServiceStartDto dto, String target) {
        try {
            // 프로젝트 정보 조회
            ProjectFile projectFile = projectManager.getProjectFile(dto.getProjectJarFileId());
            Project project = projectManager.getProject(dto.getProjectJarFileId());
            ProjectBuild projectBuild = projectManager.getProjectBuild(dto.getProjectJarFileId());

            // 프로젝트 디렉토리 설정
            MetaData metaData = projectFileService.setupProjectDirectory(
                    dto.getProjectId(), dto.getProjectJarFileId(),
                    projectFile, project, target, projectBuild.getVersion());

            // 인스턴스에 메타데이터 할당
            instanceManager.assignInstance(target, metaData);

            // 도커 이미지 빌드 및 배포
            File projectDirectory = projectFileService.getProjectDirectory(
                    dto.getProjectId(), dto.getProjectJarFileId());

            dockerBuildService.buildAndTagImage(
                    project, projectBuild, projectDirectory, target);

            dockerDeployService.deployStack(
                    project, projectBuild, projectDirectory, target);

            // 빌드 상태 업데이트
            redisMessagePublisher.publishLog(MessageDto.builder()
                    .message(DockerConsoleLogMessage.builder()
                            .projectId(project.getId())
                            .projectJarFileId(projectBuild.getId())
                            .build())
                    .type(MessageDto.Type.DOCKER_RUN)
                    .build());

            projectManager.updateBuildStatus(dto.getProjectJarFileId(), ProjectBuildStatus.RUN);

            // 모니터링 시작
            serviceMonitoringService.startMonitoring(
                    target, project.getEnglishName(), dto.getProjectId(), dto.getProjectJarFileId());

        } catch (Exception e) {
            log.error("Error on {}: {}", target, e.getMessage());
            e.printStackTrace();

            // 실패 처리
            instanceManager.releaseInstance(target);
            projectFileService.cleanupProjectDirectory(dto.getProjectId(), dto.getProjectJarFileId());

            redisMessagePublisher.publishLog(MessageDto.builder()
                    .message(DockerMessage.builder()
                            .projectId(dto.getProjectId())
                            .projectJarFileId(dto.getProjectJarFileId())
                            .build())
                    .type(MessageDto.Type.DOCKER_BUILD_ERROR)
                    .build());

            projectManager.updateBuildStatus(dto.getProjectJarFileId(), ProjectBuildStatus.BUILD_ERROR);
        }
    }

    public void stopService(ServiceStopDto dto) {
        MetaData metaData = projectFileService.getMetaData(dto.getProjectId(), dto.getProjectJarFileId());
        if (metaData == null) {
            return;
        }

        redisMessagePublisher.publishLog(MessageDto.builder()
                .message(DockerConsoleLogMessage.builder()
                        .projectId(dto.getProjectId())
                        .projectJarFileId(dto.getProjectJarFileId())
                        .build())
                .type(MessageDto.Type.DOCKER_RUN_DONE)
                .build());

        projectManager.updateBuildStatus(dto.getProjectJarFileId(), ProjectBuildStatus.DONE);

        // 서비스 종료
        dockerDeployService.removeStack(metaData.getProjectName());
        instanceManager.releaseInstance(metaData.getInstanceName());
        projectFileService.cleanupProjectDirectory(metaData.getProjectId(), metaData.getProjectJarFileId());
        serviceMonitoringService.stopMonitoring(metaData.getProjectJarFileId());
    }
}