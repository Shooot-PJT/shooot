package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.projecttest.controller.dto.ProjectBuildView;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectBuildRepository extends JpaRepository<ProjectBuild, Integer> {

    Boolean existsByProject_IdAndFileNameAndMd5CheckSum(Integer projectId, String fileName, String md5CheckSum);

    @Query("SELECT pb FROM ProjectBuild pb WHERE pb.project.id = :projectId AND pb.version.major = :majorVersion AND pb.version.minor = :minorVersion AND pb.version.patch = :patchVersion AND pb.fileName = :fileName")
    List<ProjectBuild> findAllByProjectNameAndVersionAndCheckSum(@Param("projectId") Integer projectId, @Param("majorVersion") Integer majorVersion, @Param("minorVersion") Integer minorVersion, @Param("patchVersion") Integer patchVersion, @Param("fileName") String fileName);

    @Query("SELECT new com.shooot.application.projecttest.controller.dto.ProjectBuildView(pb, pbl.status) FROM ProjectBuild pb LEFT JOIN ProjectBuildLog pbl ON pbl.projectBuild = pb WHERE pb.project.id = :projectId AND pbl.id IN (SELECT MAX(id) FROM ProjectBuildLog GROUP BY projectBuild)  ORDER BY pb.createdAt DESC ")
    List<ProjectBuildView> findAllByProject_Id(@Param("projectId") Integer projectId);

    Optional<ProjectBuild> findByProject_IdAndIsDeploymentTrue(Integer projectId);
}
