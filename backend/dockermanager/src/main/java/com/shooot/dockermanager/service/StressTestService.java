package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.BuildFileTestMethod;
import com.shooot.dockermanager.domain.projecttest.Project;
import com.shooot.dockermanager.domain.projecttest.StressTestLog;
import com.shooot.dockermanager.domain.projecttest.StressTestResult;
import com.shooot.dockermanager.domain.projecttest.repository.ProjectRepository;
import com.shooot.dockermanager.domain.projecttest.repository.StressTestLogRepository;
import com.shooot.dockermanager.domain.projecttest.repository.StressTestResultRepository;
import com.shooot.dockermanager.dto.StressTestStartRequest;
import com.shooot.dockermanager.dto.Usage;
import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.publisher.ProjectMonitorMessagePublisher;
import com.shooot.dockermanager.publisher.StressTestMessage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class StressTestService {

    private final ProjectDirectoryManager projectDirectoryManager;
    private final Map<Integer, Integer> isRunning = new ConcurrentHashMap<>();
    private final ProjectRepository projectRepository;
    private final HttpRequestSenderService httpRequestSenderService;
    private final ProjectMonitorMessagePublisher projectMonitorMessagePublisher;
    private final StressTestLogRepository stressTestLogRepository;
    private final StressTestResultRepository stressTestResultRepository;

    @Transactional
    public void start(StressTestStartRequest request) {
        MetaData metaData = getMetaData(request.getProjectId(), request.getProjectJarFileId());
        ProcessBuilder processBuilder = getMonitorProcessBuilder(metaData);
        Project project = projectRepository.findById(request.getProjectId()).orElseThrow();
        String urlWithHost = getUrlWithHost(project, request.getUrl());
        StressTestLog stressTestLog = stressTestLogRepository.findById(
            request.getStressTestLogId()).orElseThrow();
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + request.getDuration() * 1000;

        sendRequest(request.getTestMethod(), request.getProjectJarFileId(), urlWithHost,
            request.getNumberOfThreads(), request.getDuration());

        isRunning.put(request.getProjectJarFileId(), 0);

        new Thread(() -> {
            int count = 0;
            Usage sum = Usage.builder()
                .cpu(0.0)
                .memory(0.0)
                .disk(0.0)
                .network(0.0)
                .build();
            Usage min = Usage.builder()
                .cpu(Double.MAX_VALUE)
                .memory(Double.MAX_VALUE)
                .disk(Double.MAX_VALUE)
                .network(Double.MAX_VALUE)
                .build();
            Usage max = Usage.builder()
                .cpu(Double.MIN_VALUE)
                .memory(Double.MIN_VALUE)
                .disk(Double.MIN_VALUE)
                .network(Double.MIN_VALUE)
                .build();

            try {
                Process process = processBuilder.start();
                try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                    while (System.currentTimeMillis() < endTime) {
                        if (!isRunning.containsKey(request.getProjectJarFileId())) {
                            break;
                        }
                        Usage curr = getUsage(br);

                        count++;
                        sum.add(curr);
                        min.min(curr);
                        max.max(curr);

                        StressTestMessage message = StressTestMessage.builder()
                            .projectJarFileId(request.getProjectJarFileId())
                            .httpMethod(request.getHttpMethod())
                            .url(request.getUrl())
                            .curr(curr)
                            .min(min)
                            .max(max)
                            .avg(getAverageUsage(sum, count))
                            .build();

                        projectMonitorMessagePublisher.publish(request.getProjectId(), message);
                    }

                    Usage avg = getAverageUsage(sum, count);

                    StressTestResult stressTestResult = StressTestResult.builder()
                        .stressTestLog(stressTestLog)
                        .httpMethod(request.getHttpMethod())
                        .url(request.getUrl())
                        .duration(request.getDuration())
                        .vUser(request.getNumberOfThreads())
                        .testMethod(request.getTestMethod())
                        .avgCpu(avg.getCpu())
                        .maxCpu(max.getCpu())
                        .minCpu(min.getCpu())
                        .avgMemory(avg.getMemory())
                        .maxMemory(max.getMemory())
                        .minMemory(min.getMemory())
                        .avgDisk(avg.getDisk())
                        .maxDisk(max.getDisk())
                        .minDisk(min.getDisk())
                        .avgNetwork(avg.getNetwork())
                        .maxNetwork(max.getNetwork())
                        .minNetwork(min.getNetwork())
                        .build();
                    stressTestResultRepository.save(stressTestResult);
                    stop(request.getProjectJarFileId());
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).start();
    }

    public void stop(Integer projectJarFileId) {
        httpRequestSenderService.stop(projectJarFileId);
        isRunning.remove(projectJarFileId);
    }

    private MetaData getMetaData(Integer projectId, Integer projectJarFileId) {
        return projectDirectoryManager.getMetaData(
            projectDirectoryManager.file(projectId, projectJarFileId).toPath());
    }

    private ProcessBuilder getMonitorProcessBuilder(MetaData metaData) {
        ProcessBuilder processBuilder = new ProcessBuilder(
            "ssh",
            "-o", "StrictHostKeyChecking=no",
            "-i", VagrantInstanceConstants.keys.get(metaData.getInstanceName()),
            "-p", VagrantInstanceConstants.ports.get(metaData.getInstanceName()).toString(),
            "vagrant@localhost",
            "sar -u -r -n DEV -p -d 3"
        );
        processBuilder.redirectErrorStream(true);
        return processBuilder;
    }

    private String getUrlWithHost(Project project, String url) {
        String hostUrl = "https://%s.shooot.shop".formatted(project.getEnglishName());
        return hostUrl.concat(url);
    }

    private void sendRequest(BuildFileTestMethod testMethod, Integer projectJarFileId,
        String urlWithHost, Integer numberOfThreads, Integer duration) {
        switch (testMethod) {
            case FIXED ->
                httpRequestSenderService.fixed(projectJarFileId, urlWithHost, numberOfThreads,
                    duration);
            case SPIKE ->
                httpRequestSenderService.spike(projectJarFileId, urlWithHost, numberOfThreads,
                    duration);
            case RAMP_UP ->
                httpRequestSenderService.rampUp(projectJarFileId, urlWithHost, numberOfThreads,
                    duration);
        }
    }

    private Usage getUsage(BufferedReader br) throws IOException {
        return Usage.builder()
            .cpu(getCpuUsage(br))
            .memory(getMemoryUsage(br))
            .disk(getDiskUsage(br))
            .network(getNetworkUsage(br))
            .build();
    }

    private double getCpuUsage(BufferedReader br) throws IOException {
        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("%idle")) {
                String nextLine = br.readLine();
                if (nextLine != null) {
                    String[] columns = nextLine.trim().split("\\s+");
                    if (columns.length > 5) {
                        String idleValue = columns[7];
                        Double value = Double.parseDouble(idleValue);
                        return 100 - value;
                    }
                }
            }
        }
        return 0;
    }

    private double getMemoryUsage(BufferedReader br) throws IOException {
        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("%memused")) {
                String nextLine = br.readLine();
                if (nextLine != null) {
                    String[] columns = nextLine.trim().split("\\s+");
                    if (columns.length > 4) {
                        String ramValue = columns[4];
                        Double value = Double.parseDouble(ramValue);
                        return value;
                    }
                }
            }
        }
        return 0;
    }

    private double getDiskUsage(BufferedReader br) throws IOException {
        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("sda")) {
                if (line != null) {
                    String[] columns = line.trim().split("\\s+");
                    if (columns.length > 9) {
                        String disk = columns[9];
                        Double value = Double.parseDouble(disk);
                        return value * 100;
                    }
                }
            }
        }
        return 0;
    }

    private double getNetworkUsage(BufferedReader br) throws IOException {
        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("enp0s8")) {
                if (line != null) {
                    String[] columns = line.trim().split("\\s+");
                    if (columns.length > 9) {
                        String network = columns[9];
                        Double value = Double.parseDouble(network);
                        return value * 100;
                    }
                }
            }
        }
        return 0;
    }

    private Usage getAverageUsage(Usage usage, int count) {
        return Usage.builder()
            .cpu(usage.getCpu() / count)
            .memory(usage.getMemory() / count)
            .disk(usage.getDisk() / count)
            .network(usage.getNetwork() / count)
            .build();
    }
}
