package com.shooot.dockermanager.service;

import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import com.shooot.dockermanager.handler.ProjectDirectoryManager.DirStructure;
import java.io.File;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectMonitorService {

    private final ProjectDirectoryManager projectDirectoryManager;

    public String getStatus(Integer projectId, Integer projectJarFileId, Integer duration) {
        File metaDataFile = projectDirectoryManager.getFile(projectId, projectJarFileId,
            DirStructure.METADATA).orElseThrow();
        MetaData metaData = projectDirectoryManager.getMetaData(metaDataFile.toPath());
        new ProcessBuilder("vagrant", "ssh", metaData.getInstanceName(), "-c", "'sar -t 1'");

    }
}
