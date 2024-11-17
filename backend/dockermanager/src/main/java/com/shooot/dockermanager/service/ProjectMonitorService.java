package com.shooot.dockermanager.service;

import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.publisher.ProjectMonitorMessage;
import com.shooot.dockermanager.publisher.ProjectMonitorMessagePublisher;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public void stop(Integer projectJarFileId) {
        running.remove(projectJarFileId);
    }

    public void getStatus(Integer projectId, Integer projectJarFileId, Integer duration,
        String method, String url) {
        MetaData metaData = projectDirectoryManager.getMetaData(
            projectDirectoryManager.file(projectId, projectJarFileId).toPath());
        running.put(projectJarFileId, 0);

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
            long endTime = currentTime + duration * 1000;

            try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
                while (System.currentTimeMillis() < endTime) {
                    if (!running.containsKey(projectJarFileId)) {
                        break;
                    }

                    Double cpu = getCpu(reader);
                    System.out.println("cpu: " + cpu);
                    Double ram = getRam(reader);
                    System.out.println("ram: " + ram);
                    Double disk = getDisk(reader);
                    System.out.println("disk: " + disk);
                    Double network = getNetwork(reader);
                    System.out.println("network: " + network);
                    projectMonitorMessagePublisher.publish(
                        ProjectMonitorMessage.builder()
                            .projectId(projectId)
                            .projectJarFileId(projectJarFileId)
                            .cpu(cpu)
                            .memory(ram)
                            .disk(disk)
                            .network(network)
                            .method(method)
                            .url(url)
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
}
