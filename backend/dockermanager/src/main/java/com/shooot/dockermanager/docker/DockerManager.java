package com.shooot.dockermanager.docker;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import com.shooot.dockermanager.domain.projecttest.ProjectFile;
import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectBuildRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectFileRepository;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectRepository;
import com.shooot.dockermanager.dto.ServiceStartDto;
import com.shooot.dockermanager.dto.ServiceStopDto;
import com.shooot.dockermanager.handler.DockerComposeManager;
import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
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
    private static final Map<String, String> HOSTS = Map.of("instance1", "192.168.56.10:8081", "instance2", "192.168.56.11:8082", "instance3", "192.168.56.12:8083", "instance4", "192.168.56.13:8085");
    private static final String LOG_CHANNEL = "docker_logs";
    private final ExecutorService executorService = Executors.newFixedThreadPool(4);
    private final ProjectDirectoryManager projectDirectoryManager;
    private final DockerComposeManager dockerComposeManager;

    @Autowired
    private StringRedisTemplate redisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean startDockerCompose(ServiceStartDto dto) {
        if (vagrantRepository.isFull()) return false;

        String target = vagrantRepository.getFirstEmptyInstance();
        if (target == null) throw new IllegalArgumentException("No available instance");

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

            fetchDockerComposeLogs(target, project.getEnglishName());
            monitorHealthCheck(target, project.getEnglishName());
        } catch (Exception e) {
            log.error("Error on {}: {}", target, e.getMessage());
            e.printStackTrace();
        }
    }

    private void setupProjectDirectory(ServiceStartDto dto, ProjectFile projectFile, Project project, String target, ProjectVersion projectVersion) throws IOException {
        projectDirectoryManager.mkDir(dto.getProjectId(), dto.getProjectJarFileId());
        projectDirectoryManager.setFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE, projectFile.getDockerComposeFile());
        projectDirectoryManager.setFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.JAR, projectFile.getProjectFile());
        projectDirectoryManager.setMetaData(dto.getProjectId(), dto.getProjectJarFileId(), MetaData.builder()
                .projectJarFileId(dto.getProjectJarFileId())
                .projectId(dto.getProjectId())
                .projectName(project.getEnglishName())
                .instanceName(target)
                .build());

        copyDockerfile(dto);
        dockerComposeManager.mergeDockerCompose(projectDirectoryManager.getFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE).orElseThrow(IllegalArgumentException::new), project.getEnglishName(), target, projectVersion);
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
        File directory = new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/" + project.getEnglishName() + "/" + projectBuild.getVersion());
        executeProcess(new ProcessBuilder("docker", "build", "-t", project.getEnglishName() + ":" + projectBuild.getVersion(), ".").directory(directory), "Docker build image", target);
        executeProcess(new ProcessBuilder("docker", "tag", project.getEnglishName() + ":" + projectBuild.getVersion(), "192.168.56.1:5000/" + project.getEnglishName() + ":" + projectBuild.getVersion()), "Docker image tag", target);
        executeProcess(new ProcessBuilder("docker", "push", "192.168.56.1:5000/" + project.getEnglishName() + ":" + projectBuild.getVersion()), "Docker image push", target);
        executeProcess(new ProcessBuilder("docker", "stack", "deploy", "-c", "docker-compose.yml", project.getEnglishName()).directory(directory), "Docker Compose deployment", target);
    }

    private void executeProcess(ProcessBuilder processBuilder, String taskDescription, String target) throws IOException, InterruptedException {
        int exitCode = processBuilder.start().waitFor();
        if (exitCode != 0) {
            log.error("error : {}", processBuilder.command().toString());
            throw new RuntimeException("Error occurred while executing " + taskDescription + " on instance " + target);
        }
    }

    private void fetchDockerComposeLogs(String target, String projectEnglishName) {
        new Thread(() -> {
            boolean keepRunning = true;
            while (keepRunning) {
                try {
                    Process process = new ProcessBuilder("docker", "service", "logs", "-f", projectEnglishName + "_" + projectEnglishName).start();
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            String logMessage = "[" + target + "] " + line;
                            log.info(logMessage);
                            publishLog(logMessage);
                        }
                    }
                    if (process.waitFor() != 0) keepRunning = false;
                    Thread.sleep(100);
                } catch (Exception e) {
                    log.error("Error fetching logs on {}: {}", target, e.getMessage());
                    keepRunning = false;
                }
            }
        }).start();
    }

    private void monitorHealthCheck(String target, String englishName) {
        String healthUrl = "http://" + HOSTS.get(target) + "/actuator/health";
        new Thread(() -> {
            try {
                int failureCount = 0;
                boolean isRunning = true;
                while (isRunning) {
                    ResponseEntity<String> response = restTemplate.getForEntity(healthUrl, String.class);
                    if (response.getStatusCode().is2xxSuccessful() && response.getBody().contains("\"status\":\"UP\"")) {
                        log.info("[{}] Service is healthy.", target);
                    } else if (++failureCount >= 30) {
                        log.info("[{}] Service is down. Shutting down Docker Compose...", target);
                        stopDockerCompose(target, englishName);
                        isRunning = false;
                    }
                    Thread.sleep(5000);
                }
            } catch (Exception e) {
                log.error("Health check error on {}: {}", target, e.getMessage());
                stopDockerCompose(target, englishName);
            }
        }).start();
    }

    public void stopDockerCompose(String target, String englishName) {
        executeStopProcess("docker", "stack", "rm", englishName);
        vagrantRepository.remove(target);
    }

    public void stopDockerCompose(ServiceStopDto serviceStopDto) {
        MetaData metaData = projectDirectoryManager.getMetaData(Path.of(projectDirectoryManager.file(serviceStopDto.getProjectId(), serviceStopDto.getProjectJarFileId()).getPath()));
        executeStopProcess("docker", "stack", "rm", metaData.getProjectName());
        vagrantRepository.remove(metaData.getInstanceName());
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

    private void publishLog(String logMessage) {
        redisTemplate.convertAndSend(LOG_CHANNEL, logMessage);
    }
}
