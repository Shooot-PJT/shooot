package com.shooot.dockermanager.service;

import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.handler.ProjectDirectoryManager.DirStructure;
import com.shooot.dockermanager.publisher.ProjectMonitorMessage;
import com.shooot.dockermanager.publisher.ProjectMonitorMessagePublisher;
import java.io.BufferedReader;
import java.io.File;
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
        File metaDataFile = projectDirectoryManager.getFile(projectId, projectJarFileId,
            DirStructure.METADATA).orElseThrow();
        System.out.println(metaDataFile.exists());
        MetaData metaData = projectDirectoryManager.getMetaData(metaDataFile.toPath());

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
                    projectMonitorMessagePublisher.publish(
                        ProjectMonitorMessage.builder()
                            .projectId(projectId)
                            .projectJarFileId(projectJarFileId)
                            .message(line)
                            .build());
                }
            }

            process.destroy();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
