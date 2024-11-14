package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.BuildFileApiDocs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuildFileApiDocsRepository extends JpaRepository<BuildFileApiDocs, Integer> {


    List<BuildFileApiDocs> findAllByProjectBuild_Id(Integer projectJarFileId);
}
