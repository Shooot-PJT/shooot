package com.shooot.dockermanager.docker;

import com.shooot.dockermanager.domain.projecttest.*;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildLogRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectFileRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectRepository;
import com.shooot.dockermanager.dto.ServiceStartDto;
import com.shooot.dockermanager.dto.ServiceStopDto;
import com.shooot.dockermanager.exception.definition.InstanceIsFullException;
import com.shooot.dockermanager.handler.DockerComposeManager;
import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.publisher.DockerConsoleLogMessage;
import com.shooot.dockermanager.publisher.DockerMessage;
import com.shooot.dockermanager.publisher.MessageDto;
import com.shooot.dockermanager.publisher.RedisMessagePublisher;
import com.shooot.dockermanager.service.ProjectBuildLogUpdateService;
import com.shooot.dockermanager.vagrant.VagrantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.file.Path;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RequiredArgsConstructor
@Slf4j
@Service
public class DockerManager {

    private final VagrantRepository vagrantRepository;
    private final ProjectFileRepository projectFileRepository;
    private final ProjectRepository projectRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private static final Map<String, String> HOSTS = Map.of("instance1", "192.168.56.10:8082", "instance2", "192.168.56.11:8083", "instance3", "192.168.56.12:8084", "instance4", "192.168.56.13:8085");
    private final RedisMessagePublisher redisMessagePublisher;
    private final ExecutorService executorService = Executors.newFixedThreadPool(4);
    private final ProjectDirectoryManager projectDirectoryManager;
    private final DockerComposeManager dockerComposeManager;
    private final ConcurrentMap<Integer, Thread> logFetcherThreads = new ConcurrentHashMap<>();
    private final ConcurrentMap<Integer, Thread> healthCheckThreads = new ConcurrentHashMap<>();
    private final ProjectBuildLogUpdateService projectBuildLogUpdateService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean startDockerCompose(ServiceStartDto dto) {
        String target = vagrantRepository.getFirstEmptyInstance();
        if (target == null) throw new InstanceIsFullException();

        executorService.submit(() -> startDockerComposeProcess(dto, target));
        return true;
    }

    private void startDockerComposeProcess(ServiceStartDto dto, String target) {
        try {
            ProjectFile projectFile = projectFileRepository.findById(dto.getProjectJarFileId()).orElseThrow(IllegalArgumentException::new);
            Project project = projectRepository.findByProjectJarFileId(dto.getProjectJarFileId()).orElseThrow(IllegalArgumentException::new);
            ProjectBuild projectBuild = projectBuildRepository.findById(dto.getProjectJarFileId()).orElseThrow(IllegalArgumentException::new);

            setupProjectDirectory(dto, projectFile, project, target, projectBuild.getVersion());
            buildAndDeployDockerImage(project, projectBuild, target);

            fetchDockerComposeLogs(target, project.getEnglishName(), dto.getProjectId(), dto.getProjectJarFileId());
            monitorHealthCheck(target, project.getEnglishName(), dto.getProjectId(), dto.getProjectJarFileId());
        } catch (Exception e) {
            log.error("Error on {}: {}", target, e.getMessage());
            e.printStackTrace();
            vagrantRepository.remove(target);
            projectDirectoryManager.rmDir(dto.getProjectId(), dto.getProjectJarFileId());
            redisMessagePublisher.publishLog(MessageDto.builder()
                    .message(DockerMessage.builder()
                            .projectId(dto.getProjectId())
                            .projectJarFileId(dto.getProjectJarFileId())
                            .build())
                    .type(MessageDto.Type.DOCKER_BUILD_ERROR)
                    .build());
            projectBuildLogUpdateService.projectBuildLogUpdate(dto.getProjectJarFileId(), ProjectBuildStatus.BUILD_ERROR);
        }
    }

    private void setupProjectDirectory(ServiceStartDto dto, ProjectFile projectFile, Project project, String target, ProjectVersion projectVersion) throws IOException {
        projectDirectoryManager.mkDir(dto.getProjectId(), dto.getProjectJarFileId());
        projectDirectoryManager.setFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE, projectFile.getDockerComposeFile());
        projectDirectoryManager.setFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.JAR, projectFile.getProjectFile());

        MetaData metaData = MetaData.builder()
                .projectJarFileId(dto.getProjectJarFileId())
                .projectId(dto.getProjectId())
                .projectName(project.getEnglishName())
                .instanceName(target)
                .build();
        projectDirectoryManager.setMetaData(dto.getProjectId(), dto.getProjectJarFileId(), metaData);

        copyDockerfile(dto);
        dockerComposeManager.mergeDockerCompose(projectDirectoryManager.getFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE).orElseThrow(IllegalArgumentException::new), project.getEnglishName(), target, projectVersion);
        vagrantRepository.put(target, metaData);
    }

    private void copyDockerfile(ServiceStartDto dto) throws IOException {
        File copyTargetFile = new File("/home/hyunjinkim/deployment/scripts/Dockerfile");
        File copyDir = new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/" + dto.getProjectId() + "/" + dto.getProjectJarFileId() + "/Dockerfile");

        try (FileInputStream fis = new FileInputStream(copyTargetFile);
             FileOutputStream fos = new FileOutputStream(copyDir)) {
            fos.write(fis.readAllBytes());
        }
    }

    private void buildAndDeployDockerImage(Project project, ProjectBuild projectBuild, String target) throws IOException, InterruptedException {
        File directory = new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/" + project.getId() + "/" + projectBuild.getId());
        executeProcess(new ProcessBuilder("docker", "build", "-t", project.getEnglishName() + ":" + projectBuild.getVersion(), ".").directory(directory), "Docker build image", target);
        executeProcess(new ProcessBuilder("docker", "tag", project.getEnglishName() + ":" + projectBuild.getVersion(), "192.168.56.1:5000/" + project.getEnglishName() + ":" + projectBuild.getVersion()), "Docker image tag", target);
        executeProcess(new ProcessBuilder("docker", "push", "192.168.56.1:5000/" + project.getEnglishName() + ":" + projectBuild.getVersion()), "Docker image push", target);
        executeProcess(new ProcessBuilder("docker", "stack", "deploy", "-c", "docker-compose.yml", project.getEnglishName()).directory(directory), "Docker Compose deployment", target);
        redisMessagePublisher.publishLog(MessageDto.builder()
                .message(DockerConsoleLogMessage.builder()
                        .projectId(project.getId())
                        .projectJarFileId(projectBuild.getId())
                        .build())
                .type(MessageDto.Type.DOCKER_RUN)
                .build());
        projectBuildLogUpdateService.projectBuildLogUpdate(projectBuild.getId(), ProjectBuildStatus.RUN);

    }

    private void executeProcess(ProcessBuilder processBuilder, String taskDescription, String target) throws IOException, InterruptedException {
        int exitCode = processBuilder.start().waitFor();
        if (exitCode != 0) {
            log.error("error : {}", processBuilder.command().toString());
            throw new RuntimeException("Error occurred while executing " + taskDescription + " on instance " + target);
        }
    }

    public void fetchDockerComposeLogs(String target, String projectEnglishName, Integer projectId, Integer projectJarFileId) {
        Thread logThread = new Thread(() -> {
            boolean keepRunning = true;
            while (keepRunning && !Thread.currentThread().isInterrupted()) {
                Process process = null;
                try {
                    process = new ProcessBuilder("docker", "service", "logs", "-f", projectEnglishName + "_" + projectEnglishName).start();
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                        String line;
                        while ((line = reader.readLine()) != null && !Thread.currentThread().isInterrupted()) {
                            String[] parts = line.split("\\|", 2);
                            String logMessage = "[" + projectEnglishName + "] " + parts[1];
                            log.info(logMessage);
                            redisMessagePublisher.publishLog(MessageDto.builder()
                                    .message(DockerConsoleLogMessage.builder()
                                            .log(logMessage)
                                            .projectId(projectId)
                                            .projectJarFileId(projectJarFileId)
                                            .build())
                                    .type(MessageDto.Type.DOCKER_CONSOLE_LOG)
                                    .build());

                        }
                    }
                    if (process.waitFor() != 0) keepRunning = false;
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt(); // 인터럽트 상태를 유지
                    keepRunning = false;
                } catch (Exception e) {
                    log.error("{}에서 로그 가져오기 오류: {}", projectEnglishName, e.getMessage());
                    keepRunning = false;
                } finally {
                    if (process != null) {
                        process.destroyForcibly();
                    }
                }
            }
            logFetcherThreads.remove(projectJarFileId);
        });
        logFetcherThreads.put(projectJarFileId, logThread);
        logThread.start();
    }
    public void monitorHealthCheck(String target, String englishName, Integer projectId, Integer projectJarFileId) {
        String healthUrl = "http://" + HOSTS.get(target) + "/actuator/health";
        Thread healthThread = new Thread(() -> {

            int failureCount = 0;
            boolean isRunning = true;
            while (isRunning && !Thread.currentThread().isInterrupted()) {
                ResponseEntity<String> response = null;
                try {
                    response = restTemplate.getForEntity(healthUrl, String.class);
                    if (response != null && response.getStatusCode().is2xxSuccessful() && response.getBody().contains("\"status\":\"UP\"")) {
                        log.info("[{}] 서비스가 정상적으로 실행 중입니다.", englishName);
                        failureCount = 0;
                    } else {
                        failureCount++;
                        log.warn("[{}] 서비스 응답이 비정상적입니다.", englishName);
                    }
                } catch (Exception e) {
                    log.error("[{}] Health check 오류: {}", englishName, e.getMessage());
                    failureCount++;
                }

                if (failureCount >= 30) {
                    log.info("[{}] 서비스가 다운되었습니다. Docker Compose를 중지합니다...", englishName);
                    redisMessagePublisher.publishLog(MessageDto.builder()
                            .message(DockerMessage.builder()
                                    .projectJarFileId(projectJarFileId)
                                    .projectId(projectId)
                                    .build())
                            .type(MessageDto.Type.DOCKER_RUNTIME_ERROR)
                            .build());
                    projectBuildLogUpdateService.projectBuildLogUpdate(projectJarFileId, ProjectBuildStatus.RUNTIME_ERROR);
                    stopDockerCompose(target, englishName, projectId, projectJarFileId);
                    isRunning = false;
                }

                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt(); // 인터럽트 상태 유지
                    isRunning = false;
                }
            }
            healthCheckThreads.remove(projectJarFileId);
        });
        healthCheckThreads.put(projectJarFileId, healthThread);
        healthThread.start();
    }


    public void stopDockerCompose(String target, String englishName, Integer projectId, Integer projectJarFileId) {
        try {
            executeStopProcess("docker", "stack", "rm", englishName);
        }catch (Exception ignored) {

        }
        vagrantRepository.remove(target);
        projectDirectoryManager.rmDir(projectId, projectJarFileId);

        // 로그 스레드 인터럽트
        Thread logThread = logFetcherThreads.get(projectJarFileId);
        if (logThread != null) {
            logThread.interrupt();
        }

        // Health Check 스레드 인터럽트
        Thread healthThread = healthCheckThreads.get(projectJarFileId);
        if (healthThread != null) {
            healthThread.interrupt();
        }
    }
    public void stopDockerCompose(ServiceStopDto serviceStopDto) {
        MetaData metaData = projectDirectoryManager.getMetaData(Path.of(projectDirectoryManager.file(serviceStopDto.getProjectId(), serviceStopDto.getProjectJarFileId()).getPath()));
        if(metaData == null) {
            return;
        }
        redisMessagePublisher.publishLog(MessageDto.builder()
                .message(DockerConsoleLogMessage.builder()
                        .projectId(serviceStopDto.getProjectId())
                        .projectJarFileId(serviceStopDto.getProjectJarFileId())
                        .build())
                .type(MessageDto.Type.DOCKER_RUN_DONE)
                .build());
        projectBuildLogUpdateService.projectBuildLogUpdate(serviceStopDto.getProjectJarFileId(), ProjectBuildStatus.DONE);
        stopDockerCompose(metaData.getInstanceName(), metaData.getProjectName(), metaData.getProjectId(), metaData.getProjectJarFileId());
    }

    private void executeStopProcess(String... commands) {
        try {
            ProcessBuilder builder = new ProcessBuilder(commands);
            int exitCode = builder.start().waitFor();
            if (exitCode != 0) {
                log.info("Failed to stop Docker Compose : {}", builder.command().toString());
                throw new RuntimeException("Failed to stop Docker Compose");
            }
        } catch (Exception e) {
            log.error("Error stopping Docker Compose: {}", e.getMessage());
        }
    }


}
