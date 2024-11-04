package com.shooot.dockermanager.handler;

import com.shooot.dockermanager.domain.projecttest.ProjectVersion;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ProjectMetadataHandler {
    @Value("${vagrant.base-dir}")
    private String BASE_DIR;


    //메타데이터 생성 및 삭제
    public static void mkMetadata(Integer projectJarFileId, String instanceName, String projectName, ProjectVersion version) {

    }


}
