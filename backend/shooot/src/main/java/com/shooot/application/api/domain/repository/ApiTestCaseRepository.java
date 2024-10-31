package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestCaseRequest;
import com.shooot.application.api.ui.dto.ApiDetailView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApiTestCaseRepository extends JpaRepository<ApiTestCase, Integer> {

    @Query("SELECT t FROM ApiTestCase t WHERE t.api.id = :apiId AND t.api.is_deleted = false")
    List<ApiTestCase> findApiTestCasesByApiId(Integer apiId);

    @Query("SELECT t FROM ApiTestCase t WHERE t.id = :testcaseId AND t.api.is_deleted = false")
    Optional<ApiTestCase> findApiTestCaseById(Integer testcaseId);

    @Query("SELECT new com.shooot.application.api.ui.dto.ApiDetailView(" +
            "t.id, t.api, t.title, t.httpStatus, t.testCaseStatus, t.modifiedAt, t.createdAt, " +
            "r.id, r.type, r.content, " +
            "l.id, l.httpStatus, l.httpBody, l.httpHeader) " +
            "FROM ApiTestCase t " +
            "JOIN ApiTestCaseRequest r ON t.id = r.apiTestCase.id " +
            "LEFT JOIN ApiTestLog l ON t.id = l.apiTestCase.id " +
            "WHERE t.id = :testcaseId AND t.api.isDeleted = false " +
            "ORDER BY r.id DESC, l.id DESC")
    Optional<ApiDetailView> findApiDetailByTestCaseId(@Param("testcaseId") Integer testcaseId);


}
