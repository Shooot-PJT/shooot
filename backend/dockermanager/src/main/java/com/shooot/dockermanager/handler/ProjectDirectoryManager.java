package com.shooot.dockermanager.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class ProjectDirectoryManager {

    @Value("${vagrant.base-dir}")
    private String BASE_DIR;

    //디랙토리 생성 및 삭제
    public void mkDir(Integer projectId, Integer projectJarFileId) {
        file(projectId, projectJarFileId).mkdirs();
    }

    public void rmDir(Integer projectId, Integer projectJarFileId) {
        File file = file(projectId, projectJarFileId);
        if(!file.exists()) {
            return;
        }
        File[] children;

        if((children = file.listFiles()) == null) {
            return;
        }

        for(File child : children) {
            child.delete();
        }
        file.delete();
    }

    public Optional<File> getFile(Integer projectId, Integer projectJarFileId, DirStructure structure) {
        File file = file(projectId, projectJarFileId);

        if(!file.exists()) {
            return Optional.empty();
        }

        File target =  switch (structure) {
            case METADATA -> new File(file.getPath() + "metadata");
            case JAR -> new File(file.getPath() + "application.jar");
            case DOCKER_COMPOSE -> new File(file.getPath() + "docker-compose.yml");
            default -> null;
        };

        if(target == null || target.exists()) {
            return Optional.of(target);
        }
        return Optional.empty();
    }

    public void setFile(Integer projectId, Integer projectJarFileId, DirStructure structure, byte[] fileByte) {
        File file = file(projectId, projectJarFileId);

        File target =  switch (structure) {
            case METADATA -> new File(file.getPath() + "metadata");
            case JAR -> new File(file.getPath() + "application.jar");
            case DOCKER_COMPOSE -> new File(file.getPath() + "docker-compose.yml");
            default -> throw new IllegalArgumentException("파일 구조에 정의되지 않은 타입입니다.");
        };


        try (FileOutputStream fos = new FileOutputStream(target)) {
            fos.write(fileByte);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    private File file(Integer projectId, Integer projectJarFileId) {
        return new File(BASE_DIR + "/" + projectId + "/" + projectJarFileId);
    }

    public enum DirStructure {
        METADATA, JAR, DOCKER_COMPOSE
    }

}
