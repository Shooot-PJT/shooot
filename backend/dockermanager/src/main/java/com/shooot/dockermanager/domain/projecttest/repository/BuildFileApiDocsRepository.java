package com.shooot.dockermanager.domain.projecttest.repository;

import com.shooot.dockermanager.domain.projecttest.BuildFileApiDocs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuildFileApiDocsRepository extends JpaRepository<BuildFileApiDocs, Integer> {


    List<BuildFileApiDocs> findAllByProjectBuild_Id(Integer projectJarFileId);
}
