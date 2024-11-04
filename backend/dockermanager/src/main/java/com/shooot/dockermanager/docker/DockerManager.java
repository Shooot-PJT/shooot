package com.shooot.dockermanager.docker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class DockerManager {

    private final String[] hosts = {"192.168.53.1", "192.168.53.2", "192.168.53.3", "192.168.53.4"};
    private static final String LOG_CHANNEL = "docker_logs";
    private final ExecutorService executorService = Executors.newFixedThreadPool(4);

    @Autowired
    private StringRedisTemplate redisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Docker Compose 실행 및 health check 시작
     */
    public void startDockerCompose() {
        for (int i = 0; i < hosts.length; i++) {
            final int instanceIndex = i + 1;

            // Docker Compose up
            executorService.submit(() -> {
                try {
                    Process process = new ProcessBuilder("vagrant", "ssh", "instance" + instanceIndex, "-c", "docker-compose up -d")
                            .start();

                    int exitCode = process.waitFor();
                    if (exitCode != 0) {
                        throw new RuntimeException("Error occurred while starting Docker Compose on instance" + instanceIndex);
                    }

                    // Health check 및 로그 모니터링 시작
                    fetchDockerComposeLogs(instanceIndex);
                    monitorHealthCheck(instanceIndex, hosts[instanceIndex - 1]);
                } catch (Exception e) {
                    System.err.println("Error on instance" + instanceIndex + ": " + e.getMessage());
                }
            });
        }
    }

    /**
     * Docker Compose 로그 실시간 추적 및 Redis Pub/Sub로 전송
     */
    private void fetchDockerComposeLogs(int instanceIndex) {
        new Thread(() -> {
            boolean keepRunning = true;
            while (keepRunning) {
                try {
                    Process process = new ProcessBuilder("vagrant", "ssh", "instance" + instanceIndex, "-c", "docker-compose logs -f")
                            .start();

                    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        final String logMessage = "[instance" + instanceIndex + "] " + line;
                        System.out.println(logMessage);
                        publishLog(logMessage);
                    }

                    int exitCode = process.waitFor();
                    if (exitCode != 0) {
                        System.err.println("Docker Compose logs process terminated unexpectedly on instance" + instanceIndex);
                    }

                    // 재시도 대기
                    Thread.sleep(5000); // 5초 후 재시도

                } catch (Exception e) {
                    System.err.println("Error fetching logs on instance" + instanceIndex + ": " + e.getMessage());
                    keepRunning = false; // 오류 발생 시 루프 종료, 필요 시 재시도
                }
            }
        }).start();
    }

    /**
     * Health check 모니터링. Spring Actuator의 /actuator/health 엔드포인트를 통해 상태 확인.
     */
    private void monitorHealthCheck(int instanceIndex, String host) {
        new Thread(() -> {
            String healthUrl = "http://" + host + ":8080/actuator/health"; // 각 인스턴스의 health check URL
            try {
                boolean isRunning = true;
                while (isRunning) {
                    ResponseEntity<String> response = restTemplate.getForEntity(healthUrl, String.class);
                    if (response.getStatusCode().is2xxSuccessful() && response.getBody().contains("\"status\":\"UP\"")) {
                        System.out.println("[instance" + instanceIndex + "] Service is healthy.");
                    } else {
                        System.out.println("[instance" + instanceIndex + "] Service is down. Shutting down Docker Compose...");
                        stopDockerCompose(instanceIndex);
                        isRunning = false; // health check 종료
                    }
                    Thread.sleep(5000); // 5초마다 health check
                }
            } catch (Exception e) {
                System.err.println("Health check error on instance" + instanceIndex + ": " + e.getMessage());
                stopDockerCompose(instanceIndex);
            }
        }).start();
    }

    /**
     * Docker Compose 종료
     */
    public void stopDockerCompose(int instanceIndex) {
        try {
            Process process = new ProcessBuilder("vagrant", "ssh", "instance" + instanceIndex, "-c", "docker-compose down")
                    .start();

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Docker Compose stopped successfully on instance" + instanceIndex);
            } else {
                System.err.println("Failed to stop Docker Compose on instance" + instanceIndex);
            }
        } catch (Exception e) {
            System.err.println("Error on instance" + instanceIndex + ": " + e.getMessage());
        }
    }

    /**
     * Redis를 통해 로그 메시지 전송
     */
    private void publishLog(String logMessage) {
        redisTemplate.convertAndSend(LOG_CHANNEL, logMessage);
    }
}