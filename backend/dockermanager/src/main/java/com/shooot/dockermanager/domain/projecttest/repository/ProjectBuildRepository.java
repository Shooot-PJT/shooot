package com.shooot.dockermanager.domain.projecttest.repository;

import com.shooot.dockermanager.domain.projecttest.ProjectBuild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectBuildRepository extends JpaRepository<ProjectBuild, Integer> {

    Boolean existsByProject_IdAndFileNameAndMd5CheckSum(Integer projectId, String fileName, String md5CheckSum);

    @Query("SELECT pb FROM ProjectBuild pb WHERE pb.project.id = :projectId AND pb.version.major = :majorVersion AND pb.version.minor = :minorVersion AND pb.version.patch = :patchVersion AND pb.fileName = :fileName")
    List<ProjectBuild> findAllByProjectNameAndVersionAndCheckSum(@Param("projectId") Integer projectId, @Param("majorVersion") Integer majorVersion, @Param("minorVersion") Integer minorVersion, @Param("patchVersion") Integer patchVersion, @Param("fileName") String fileName);


    Optional<ProjectBuild> findByProject_IdAndIsDeploymentTrue(Integer projectId);
}
