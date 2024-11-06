package com.shooot.dockermanager.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Path;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class
ProjectDirectoryManager {

    @Value("${vagrant.base-dir}")
    private String BASE_DIR;

    //디랙토리 생성 및 삭제
    public void mkDir(Integer projectId, Integer projectJarFileId) {
        file(projectId, projectJarFileId).mkdirs();
    }

    public void rmDir(Integer projectId, Integer projectJarFileId) {
        File file = file(projectId, projectJarFileId);
        if (!file.exists()) {
            return;
        }
        File[] children;

        if ((children = file.listFiles()) == null) {
            return;
        }

        for (File child : children) {
            child.delete();
        }
        file.getParentFile().delete();
        file.delete();
    }

    public Optional<File> getFile(Integer projectId, Integer projectJarFileId, DirStructure structure) {
        File file = file(projectId, projectJarFileId);

        if (!file.exists()) {
            return Optional.empty();
        }

        File target = switch (structure) {
            case METADATA -> new File(file.getPath() + "metadata");
            case JAR -> new File(file.getPath() + "application.jar");
            case DOCKER_COMPOSE -> new File(file.getPath() + "docker-compose.yml");
            default -> null;
        };

        if (target == null || target.exists()) {
            return Optional.of(target);
        }
        return Optional.empty();
    }

    public void setFile(Integer projectId, Integer projectJarFileId, DirStructure structure, byte[] fileByte) {
        File file = file(projectId, projectJarFileId);

        File target = switch (structure) {
            case METADATA -> new File(file.getPath() + "/metadata");
            case JAR -> new File(file.getPath() + "/application.jar");
            case DOCKER_COMPOSE -> new File(file.getPath() + "/docker-compose.yml");
        };


        try (FileOutputStream fos = new FileOutputStream(target)) {
            fos.write(fileByte);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void setMetaData(Integer projectId, Integer projectJarFileId, MetaData metaData) {
        File file = file(projectId, projectJarFileId);
        File target = new File(file.getPath() + "metadata");
        if (!target.exists()) {
            try {
                target.createNewFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        try (FileOutputStream fos = new FileOutputStream(target);
             ObjectOutputStream outputStream = new ObjectOutputStream(fos)) {
            outputStream.writeObject(metaData);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public MetaData getMetaData(Path path) {
        File target = new File(path.toString() + "metadata");
        if (!target.exists()) {
            try {
                target.createNewFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        try (FileInputStream fis = new FileInputStream(target);
             ObjectInputStream inputStream = new ObjectInputStream(fis)) {
            return (MetaData) inputStream.readObject();
        } catch (IOException | ClassNotFoundException e) {
            throw new ClassCastException(e.getMessage());
        }
    }


    public File file(Integer projectId, Integer projectJarFileId) {
        return new File(BASE_DIR + "/" + projectId + "/" + projectJarFileId);
    }

    public enum DirStructure {
        METADATA, JAR, DOCKER_COMPOSE
    }

}
