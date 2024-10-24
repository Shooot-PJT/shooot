package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectBuildRepository extends JpaRepository<ProjectBuild, Integer> {

    Boolean existsByProject_IdAndFileNameAndMd5CheckSum(Integer projectId, String fileName, String md5CheckSum);

    @Query("SELECT pb FROM ProjectBuild pb WHERE pb.project.id = :projectId AND pb.version.major = :majorVersion AND pb.version.minor = :minorVersion AND pb.version.patch = :patchVersion AND pb.fileName = :fileName")
    List<ProjectBuild> findAllByProjectNameAndVersionAndCheckSum(@Param("projectId") Integer projectId, @Param("majorVersion") Integer majorVersion, @Param("minorVersion") Integer minorVersion, @Param("patchVersion") Integer paramVersion, @Param("fileName") String fileName);


}
