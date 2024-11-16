package com.shooot.dockermanager.service;

import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.publisher.ProjectMonitorMessage;
import com.shooot.dockermanager.publisher.ProjectMonitorMessagePublisher;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectMonitorService {

    private final ProjectDirectoryManager projectDirectoryManager;
    private final ProjectMonitorMessagePublisher projectMonitorMessagePublisher;
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
    private final String command = "sar -t 1";

    public void getStatus(Integer projectId, Integer projectJarFileId, Integer duration) {
        MetaData metaData = projectDirectoryManager.getMetaData(
            projectDirectoryManager.file(projectId, projectJarFileId).toPath());

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
                String line;
                while (System.currentTimeMillis() < endTime) {
                    Double cpu = getCpu(reader);
                    System.out.println(cpu);
                    projectMonitorMessagePublisher.publish(
                        ProjectMonitorMessage.builder()
                            .projectId(projectId)
                            .projectJarFileId(projectJarFileId)
                            .message("")
                            .build());
                    Thread.sleep(1000);
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
            System.out.println(line);
            if (line.contains("%idle")) {
                String nextLine = br.readLine();
                if (nextLine != null) {
                    String[] columns = nextLine.trim().split("\\s+");
                    if (columns.length > 5) {
                        String idleValue = columns[7];
                        Double value = Double.parseDouble(idleValue);
                        return value;
                    }
                }
            }
        }
        return 0;
    }
}
