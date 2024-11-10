package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.Api;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApiRepository extends JpaRepository<Api, Integer> {

    @Query("SELECT a FROM Api a WHERE a.id = :apiId AND a.isDeleted = false")
    Optional<Api> findByIdAndNotDeleted(@Param("apiId") Integer apiId);

    List<Api> findAllByDomain_Project_Id(Integer projectId);

    @Query("""
    SELECT a FROM Api a
    JOIN FETCH a.domain d
    JOIN FETCH d.project p
    WHERE a.id = :apiId
    """)
    Optional<Api> findByIdWithDomainAndProject(@Param("apiId") Integer apiId);

}
