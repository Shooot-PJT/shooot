package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApiTestCaseRepository extends JpaRepository<ApiTestCase, Integer> {

    @Query("SELECT t FROM ApiTestCase t WHERE t.api.id = :apiId AND t.isDeleted = false")
    List<ApiTestCase> findApiTestCasesByApiId(@Param("apiId") Integer apiId);

    @Query("SELECT t FROM ApiTestCase t WHERE t.id = :testcaseId AND t.api.isDeleted = false")
    Optional<ApiTestCase> findApiTestCaseById(@Param("testcaseId") Integer testcaseId);


}
