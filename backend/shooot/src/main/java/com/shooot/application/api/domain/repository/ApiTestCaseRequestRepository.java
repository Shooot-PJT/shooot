package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCaseRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApiTestCaseRequestRepository extends JpaRepository<ApiTestCaseRequest, Integer> {

    @Query("SELECT r FROM ApiTestCaseRequest r WHERE r.apiTestCase.id = :apiTestCaseId ORDER BY r.id DESC")
    Page<ApiTestCaseRequest> findLatestByApiTestCaseId(@Param("apiTestCaseId") Integer apiTestCaseId, Pageable pageable);

    @Query("SELECT r FROM ApiTestCaseRequest r WHERE r.apiTestCase.id = :apiTestCaseId ORDER BY r.id ASC")
    List<ApiTestCaseRequest> findRequestsByTestCaseId(@Param("apiTestCaseId") Integer apiTestCaseId);

    @Query("SELECT r FROM ApiTestCaseRequest r WHERE r.apiTestCase.id = :testCaseId ORDER BY r.id DESC")
    List<ApiTestCaseRequest> findLatestByTestCaseId(@Param("testCaseId") Integer testCaseId, Pageable pageable);

}
