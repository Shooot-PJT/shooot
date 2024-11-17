package com.shooot.dockermanager.service;

import com.shooot.dockermanager.domain.projecttest.BuildFileTestMethod;
import com.shooot.dockermanager.domain.projecttest.StressTestLog;
import com.shooot.dockermanager.domain.projecttest.StressTestResult;
import com.shooot.dockermanager.domain.projecttest.repository.StressTestLogRepository;
import com.shooot.dockermanager.domain.projecttest.repository.StressTestResultRepository;
import com.shooot.dockermanager.dto.ProjectMonitorRequest;
import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.publisher.ProjectMonitorMessage;
import com.shooot.dockermanager.publisher.ProjectMonitorMessagePublisher;
import com.shooot.dockermanager.publisher.StressTestValue;
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
public class ProjectMonitorService {

    private final ProjectDirectoryManager projectDirectoryManager;
    private final ProjectMonitorMessagePublisher projectMonitorMessagePublisher;
    private final ConcurrentHashMap<Integer, Integer> running = new ConcurrentHashMap<>();

    private final Map<String, String> keys = Map.of(
        "instance1",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance1/virtualbox/private_key",
        "instance2",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance2/virtualbox/private_key",
        "instance3",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance3/virtualbox/private_key",
        "instance4",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance4/virtualbox/private_key",
        "instance5",
        "/home/hyunjinkim/deployment/scripts/.vagrant/machines/instance5/virtualbox/private_key"
    );
    private final Map<String, Integer> ports = Map.of(
        "instance1",
        2222,
        "instance2",
        2200,
        "instance3",
        2201,
        "instance4",
        2202,
        "instance5",
        2203
    );
    private final String command = "sar -u -r -n DEV -p -d 3";
    private final StressTestLogRepository stressTestLogRepository;
    private final StressTestResultRepository stressTestResultRepository;

    public void stop(Integer projectJarFileId) {
        running.remove(projectJarFileId);
    }

    @Transactional
    public void getStatus(ProjectMonitorRequest request) {

        System.out.println(request);

        StressTestValue sum = StressTestValue.builder()
            .cpu(0.0)
            .memory(0.0)
            .disk(0.0)
            .network(0.0)
            .build();
        int count = 0;

        StressTestValue min = StressTestValue.builder()
            .cpu(Double.MAX_VALUE)
            .memory(Double.MAX_VALUE)
            .disk(Double.MAX_VALUE)
            .network(Double.MAX_VALUE)
            .build();

        StressTestValue max = StressTestValue.builder()
            .cpu(Double.MIN_VALUE)
            .memory(Double.MIN_VALUE)
            .disk(Double.MIN_VALUE)
            .network(Double.MIN_VALUE)
            .build();

        MetaData metaData = projectDirectoryManager.getMetaData(
            projectDirectoryManager.file(request.getProjectId(), request.getProjectJarFileId())
                .toPath());
        running.put(request.getProjectJarFileId(), 0);

        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                "ssh",
                "-o", "StrictHostKeyChecking=no",
                "-i", keys.get(metaData.getInstanceName()),
                "-p", ports.get(metaData.getInstanceName()).toString(),
                "vagrant@localhost",
                command
            );
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            long currentTime = System.currentTimeMillis();
            long endTime = currentTime + request.getDuration() * 1000;

            try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
                while (System.currentTimeMillis() < endTime) {
                    if (!running.containsKey(request.getProjectJarFileId())) {
                        break;
                    }

                    Double cpu = getCpu(reader);
                    Double ram = getRam(reader);
                    Double disk = getDisk(reader);
                    Double network = getNetwork(reader);

                    StressTestValue curr = StressTestValue.builder()
                        .cpu(cpu)
                        .memory(ram)
                        .disk(disk)
                        .network(network)
                        .build();

                    sum.add(curr);
                    count++;

                    min.min(curr);
                    max.max(curr);

                    projectMonitorMessagePublisher.publish(
                        ProjectMonitorMessage.builder()
                            .projectId(request.getProjectId())
                            .projectJarFileId(request.getProjectJarFileId())
                            .curr(curr)
                            .avg(getAverage(sum, count))
                            .min(min)
                            .max(max)
                            .method(request.getMethod())
                            .url(request.getUrl())
                            .build());
                    Thread.sleep(3000);
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            process.destroy();
        } catch (IOException e) {
            e.printStackTrace();
        }

        StressTestLog stressTestLog = stressTestLogRepository.findById(request.getStressTestLogId())
            .orElseThrow();

        StressTestValue avg = getAverage(sum, count);

        StressTestResult result = StressTestResult.builder()
            .stressTestLog(stressTestLog)
            .httpMethod(request.getMethod())
            .url(request.getUrl())
            .duration(request.getDuration())
            .vUser(request.getVUser())
            .testMethod(BuildFileTestMethod.valueOf(request.getTestMethod()))
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

        stressTestResultRepository.save(result);
    }

    private double getCpu(BufferedReader br) throws IOException {
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

    private double getRam(BufferedReader br) throws IOException {
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

    private double getNetwork(BufferedReader br) throws IOException {
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

    private double getDisk(BufferedReader br) throws IOException {
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

    private StressTestValue getAverage(StressTestValue sum, int count) {
        return StressTestValue.builder()
            .cpu(sum.getCpu() / count)
            .memory(sum.getMemory() / count)
            .disk(sum.getDisk() / count)
            .network(sum.getNetwork() / count)
            .build();
    }
}
