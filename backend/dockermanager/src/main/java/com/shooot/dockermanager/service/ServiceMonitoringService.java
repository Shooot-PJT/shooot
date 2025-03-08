package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.ProjectBuildStatus;
import com.shooot.dockermanager.publisher.DockerConsoleLogMessage;
import com.shooot.dockermanager.publisher.DockerMessage;
import com.shooot.dockermanager.publisher.MessageDto;
import com.shooot.dockermanager.publisher.RedisMessagePublisher;
import com.shooot.dockermanager.support.InstanceManager;
import com.shooot.dockermanager.support.ProjectManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@RequiredArgsConstructor
@Slf4j
@Service
public class ServiceMonitoringService {
    private final RedisMessagePublisher redisMessagePublisher;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ConcurrentMap<Integer, Thread> logFetcherThreads = new ConcurrentHashMap<>();
    private final ConcurrentMap<Integer, Thread> healthCheckThreads = new ConcurrentHashMap<>();
    private final InstanceManager instanceManager;
    private final ProjectManager projectManager;
    private final DockerDeployService dockerDeployService;
    private final ProjectFileService projectFileService;

    public void startMonitoring(String target, String projectEnglishName,
                                Integer projectId, Integer projectJarFileId) {
        fetchDockerComposeLogs(target, projectEnglishName, projectId, projectJarFileId);
        monitorHealthCheck(target, projectEnglishName, projectId, projectJarFileId);
    }

    public void stopMonitoring(Integer projectJarFileId) {
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

    private void fetchDockerComposeLogs(String target, String projectEnglishName,
                                        Integer projectId, Integer projectJarFileId) {
        Thread logThread = new Thread(() -> {
            boolean keepRunning = true;
            while (keepRunning && !Thread.currentThread().isInterrupted()) {
                Process process = null;
                try {
                    process = new ProcessBuilder("docker", "service", "logs", "-f",
                            projectEnglishName + "_" + projectEnglishName).start();
                    try (BufferedReader reader = new BufferedReader(
                            new InputStreamReader(process.getInputStream()))) {
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

    private void monitorHealthCheck(String target, String englishName, Integer projectId, Integer projectJarFileId) {
        String healthUrl = instanceManager.getHealthCheckUrl(target);
        Thread healthThread = new Thread(() -> {
            int failureCount = 0;
            boolean isRunning = true;
            while (isRunning && !Thread.currentThread().isInterrupted()) {
                ResponseEntity<String> response = null;
                try {
                    response = restTemplate.getForEntity(healthUrl, String.class);
                    if (response != null && response.getStatusCode().is2xxSuccessful()
                            && response.getBody().contains("\"status\":\"UP\"")) {
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
                    projectManager.updateBuildStatus(projectJarFileId, ProjectBuildStatus.RUNTIME_ERROR);
                    stopService(target, englishName, projectId, projectJarFileId);
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

    private void stopService(String target, String englishName, Integer projectId, Integer projectJarFileId) {
        dockerDeployService.removeStack(englishName);
        instanceManager.releaseInstance(target);
        projectFileService.cleanupProjectDirectory(projectId, projectJarFileId);
        stopMonitoring(projectJarFileId);
    }
}