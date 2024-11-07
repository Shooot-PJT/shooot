package com.shooot.dockermanager.docker;

import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import com.shooot.dockermanager.domain.projecttest.ProjectFile;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.file.Path;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RequiredArgsConstructor
@Service
public class DockerManager {

    private final VagrantRepository vagrantRepository;
    private final ProjectFileRepository projectFileRepository;
    private final ProjectRepository projectRepository;
    private final ProjectBuildRepository projectBuildRepository;

    private static final Map<String, String> hosts = Map.of("instance1", "192.168.56.10:8081", "instance2", "192.168.56.11:8082", "instance3", "192.168.56.12:8083", "instance4", "192.168.56.13:8085");
    private static final String LOG_CHANNEL = "docker_logs";
    private final ExecutorService executorService = Executors.newFixedThreadPool(4);
    private final ProjectDirectoryManager projectDirectoryManager;
    private final DockerComposeManager dockerComposeManager;


    @Autowired
    private StringRedisTemplate redisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Docker Compose 실행 및 health check 시작
     */
    public boolean startDockerCompose(ServiceStartDto dto) {
        if (vagrantRepository.isFull()) {
            return false;
        }

        String target = vagrantRepository.getFirstEmptyInstance();
        if(target == null) {
            //TODO : 사용할 수 있는 인스턴스가 없는 에러 작성.
            throw new IllegalArgumentException();
        }
        // Docker Compose up
        executorService.submit(() -> {
            try {
                ProjectFile projectFile = projectFileRepository.findById(dto.getProjectJarFileId()).orElseThrow(IllegalArgumentException::new);
                Project project = projectRepository.findByProjectJarFileId(dto.getProjectJarFileId()).orElseThrow(IllegalArgumentException::new);
                ProjectBuild projectBuild = projectBuildRepository.findById(dto.getProjectJarFileId()).orElseThrow(IllegalArgumentException::new);

                projectDirectoryManager.mkDir(dto.getProjectId(), dto.getProjectJarFileId());

                projectDirectoryManager.setFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE, projectFile.getDockerComposeFile());
                projectDirectoryManager.setFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.JAR, projectFile.getProjectFile());
                projectDirectoryManager.setMetaData(dto.getProjectId(), dto.getProjectJarFileId(), MetaData.builder().projectJarFileId(dto.getProjectJarFileId()).projectId(dto.getProjectId()).projectName(project.getEnglishName()).instanceName(target).build());

                File copyTargetFile = new File("/home/hyunjinkim/deployment/scripts/Dockerfile");
                File copyDir = new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/" + dto.getProjectId() + "/" + dto.getProjectJarFileId()+"/Dockerfile");

                FileInputStream fileInputStream = new FileInputStream(copyTargetFile);
                FileOutputStream fileOutputStream = new FileOutputStream(copyDir);
                fileOutputStream.write(fileInputStream.readAllBytes());

                dockerComposeManager.mergeDockerCompose(projectDirectoryManager.getFile(dto.getProjectId(), dto.getProjectJarFileId(), ProjectDirectoryManager.DirStructure.DOCKER_COMPOSE).orElseThrow(IllegalArgumentException::new), project.getEnglishName(), target, projectBuild.getVersion());

                System.out.println("instance : " + target);

                File directory = new File("/home/hyunjinkim/deployment/vagrant-instance-volumn/"+dto.getProjectId() +"/"+dto.getProjectJarFileId()+"/");

                ProcessBuilder imageGenerator = new ProcessBuilder("docker", "build", "-t", "192.168.56.1:5000/" + project.getEnglishName() +":"+projectBuild.getVersion(), ".");
                imageGenerator.directory(directory);

                ProcessBuilder imagePush = new ProcessBuilder("docker", "push", "192.168.56.1:5000/" + project.getEnglishName() +":"+projectBuild.getVersion());
                imageGenerator.directory(directory);

                ProcessBuilder processBuilder =  new ProcessBuilder("docker", "stack", "deploy", "-c", "docker-compose.yml", project.getEnglishName());
                processBuilder.directory(directory);

                int imageBuildExitCode = imageGenerator.start().waitFor();
                if(imageBuildExitCode != 0) {
                    throw new RuntimeException(imageBuildExitCode + "Error occurred while starting Docker build image on instance " + target);
                }

                Process process = processBuilder.start();

                int exitCode = process.waitFor();
                if (exitCode != 0) {
                    throw new RuntimeException("Error occurred while starting Docker Compose on instance " + target);
                }

                // Health check 및 로그 모니터링 시작
                fetchDockerComposeLogs(target, project.getEnglishName());
                monitorHealthCheck(target, project.getEnglishName());
            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Error on " + target + ": " + e.getMessage());
            }
        });
        return true;
    }

    /**
     * Docker Compose 로그 실시간 추적 및 Redis Pub/Sub로 전송
     */
    private void fetchDockerComposeLogs(String target, String projectEnglishName) {
        new Thread(() -> {
            boolean keepRunning = true;
            while (keepRunning) {
                try {
                    Process process = new ProcessBuilder("docker", "service", "logs", "-f", projectEnglishName+"_"+projectEnglishName)
                            .start();

                    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        final String logMessage = "[" + target + "] " + line;
                        System.out.println(logMessage);
                        publishLog(logMessage);
                    }

                    int exitCode = process.waitFor();
                    if (exitCode != 0) {
                        keepRunning = false;
                        System.err.println("Docker Compose logs process terminated unexpectedly on " + target);
                    }

                    // 재시도 대기
                    Thread.sleep(100); // 0.1초 후 재시도

                } catch (Exception e) {
                    e.printStackTrace();
                    System.err.println("Error fetching logs on " + target + " : " + e.getMessage());
                    keepRunning = false; // 오류 발생 시 루프 종료, 필요 시 재시도
                }
            }
        }).start();
    }

    /**
     * Health check 모니터링. Spring Actuator의 /actuator/health 엔드포인트를 통해 상태 확인.
     */
    private void monitorHealthCheck(String target, String englishName) {
        String host = hosts.get(target);
        new Thread(() -> {
            int count = 0;
            String healthUrl = "http://" + host + "/actuator/health"; // 각 인스턴스의 health check URL
            try {
                boolean isRunning = true;
                while (isRunning) {
                    ResponseEntity<String> response = restTemplate.getForEntity(healthUrl, String.class);
                    if (response.getStatusCode().is2xxSuccessful() && response.getBody().contains("\"status\":\"UP\"")) {
                        System.out.println("[" + target + "] Service is healthy.");
                    } else {

                        if(count == 30) {
                            System.out.println("[" + target + "] Service is down. Shutting down Docker Compose...");
                            stopDockerCompose(target,englishName);
                            isRunning = false; // health check 종료
                            break;
                        }
                        count++;
                    }
                    Thread.sleep(5000); // 5초마다 health check
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Health check error on " + target + ": " + e.getMessage());
                stopDockerCompose(target, englishName);
            }
        }).start();
    }

    /**
     * Docker Compose 종료
     */
    public void stopDockerCompose(String target, String englishName) {
        try {
            Process process = new ProcessBuilder("docker", "stack", "rm", englishName)
                    .start();

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Docker Compose stopped successfully on instance" + target);
                vagrantRepository.remove(target);
            } else {
                System.err.println("Failed to stop Docker Compose on " + target);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error on " + target + ": " + e.getMessage());
        }
    }


    /**
     * Docker Compose 종료
     */
    public void stopDockerCompose(ServiceStopDto serviceStopDto) {
        File metadataFile = projectDirectoryManager.file(serviceStopDto.getProjectId(), serviceStopDto.getProjectJarFileId());
        MetaData metaData = projectDirectoryManager.getMetaData(Path.of(metadataFile.getPath()));

        try {
            Process process = new ProcessBuilder("docker", "stack", "rm", metaData.getProjectName())
                    .start();

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Docker Compose stopped successfully on instance" + metaData.getInstanceName());
                vagrantRepository.remove(metaData.getInstanceName());
            } else {
                System.err.println("Failed to stop Docker Compose on " + metaData.getInstanceName());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error on " + metaData.getInstanceName() + ": " + e.getMessage());
        }
    }

    /**
     * Redis를 통해 로그 메시지 전송
     */
    private void publishLog(String logMessage) {
        redisTemplate.convertAndSend(LOG_CHANNEL, logMessage);
    }

}
