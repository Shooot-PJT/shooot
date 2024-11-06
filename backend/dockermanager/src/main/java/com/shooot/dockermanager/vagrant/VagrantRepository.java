package com.shooot.dockermanager.vagrant;

import com.shooot.dockermanager.handler.MetaData;
import com.shooot.dockermanager.handler.ProjectDirectoryManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RequiredArgsConstructor
@Component
public class VagrantRepository {
    private static final ConcurrentHashMap<String, MetaData> repository = new ConcurrentHashMap<>();
    private final ProjectDirectoryManager projectDirectoryManager;
    private static final String INSTANCE_PREFIX = "instance";
    @Value("${vagrant.base-dir}")
    private String baseDir;

    @Value("${vagrant.max-size}")
    private Integer maxSize;

    public boolean isFull() {
        return repository.size() == maxSize;
    }

    public void put(String instance, MetaData metaData) {
        log.info("instance put : {}, metadata : {}" , instance, metaData);
        repository.put(instance, metaData);
    }

    public void remove(String instance) {
        repository.remove(instance);
    }

    public String getFirstEmptyInstance() {
        for (int i = 1; i <= repository.size(); i++) {
            String target = INSTANCE_PREFIX + i;
            if (!repository.containsKey(target)) {
                return target;
            }
        }
        return null;
    }

    @EventListener
    public void init(ContextRefreshedEvent event) {
        File basePath = new File(baseDir);
        File[] projects = basePath.listFiles();

        if (projects == null) {
            return;
        }
        for (File project : projects) {
            if (!project.isDirectory()) {
                continue;
            }

            File[] projectJarFiles = project.listFiles();
            if (projectJarFiles == null) {
                continue;
            }

            for (File projectJarFile : projectJarFiles) {
                Path path = Path.of(projectJarFile.getPath());

                MetaData metaData = projectDirectoryManager.getMetaData(path);
                if (metaData == null) {
                    continue;
                }
                put(metaData.getInstanceName(), metaData);
            }
        }
    }
}
