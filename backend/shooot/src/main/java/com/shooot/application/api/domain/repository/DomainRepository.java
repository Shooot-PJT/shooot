package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.Domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DomainRepository extends JpaRepository<Domain, Integer> {
    @Query("SELECT d FROM Domain d WHERE d.project.id = :projectId AND d.isDeleted = false")
    List<Domain> findByProjectIdAndNotDeleted(@Param("projectId") Integer projectId);

    @Query("SELECT d FROM Domain d WHERE d.id = :domainId AND d.isDeleted = false")
    Optional<Domain> findByIdAndNotDeleted(@Param("domainId") Integer domainId);
}
