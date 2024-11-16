package com.shooot.dockermanager.service;

import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.publisher.ProjectMonitorMessage;
import com.shooot.dockermanager.publisher.ProjectMonitorMessagePublisher;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectMonitorService {

    private final ProjectDirectoryManager projectDirectoryManager;
    private final ProjectMonitorMessagePublisher projectMonitorMessagePublisher;

    public void getStatus(Integer projectId, Integer projectJarFileId, Integer duration) {
        MetaData metaData = projectDirectoryManager.getMetaData(
            projectDirectoryManager.file(projectId, projectJarFileId).toPath());

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("vagrant", "ssh",
                metaData.getInstanceName(), "-c", "'sar -t 1'");
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            long currentTime = System.currentTimeMillis();
            long endTime = currentTime + duration * 1000;

            try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
                String line;
                while (System.currentTimeMillis() < endTime) {
                    line = reader.readLine();
                    System.out.println(line);
                    projectMonitorMessagePublisher.publish(
                        ProjectMonitorMessage.builder()
                            .projectId(projectId)
                            .projectJarFileId(projectJarFileId)
                            .message(line)
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
}