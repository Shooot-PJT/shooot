package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApiTestCaseRequestRepository extends JpaRepository<ApiTestCaseRequest, Integer> {

    @Query("SELECT r FROM ApiTestCaseRequest r WHERE r.apiTestCase.id = :apiTestCaseId ORDER BY r.id DESC")
    Optional<ApiTestCaseRequest> findLatestByApiTestCaseId(@Param("apiTestCaseId") Integer apiTestCaseId);

    @Query("SELECT r FROM ApiTestCaseRequest r WHERE r.apiTestCase.id = :apiTestCaseId ORDER BY r.id ASC")
    List<ApiTestCaseRequest> findRequestsByTestCaseId(@Param("apiTestCaseId") Integer apiTestCaseId);

}
