package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApiTestCaseRepository extends JpaRepository<ApiTestCase, Integer> {

    @Query("SELECT t FROM ApiTestCase t WHERE t.api.id = :apiId AND t.api.is_deleted = false")
    List<ApiTestCase> findApiTestCasesByApiId(Integer apiId);

    @Query("SELECT t FROM ApiTestCase t WHERE t.id = :testcaseId AND t.api.is_deleted = false")
    Optional<ApiTestCase> findApiTestCaseById(Integer testcaseId);

}
