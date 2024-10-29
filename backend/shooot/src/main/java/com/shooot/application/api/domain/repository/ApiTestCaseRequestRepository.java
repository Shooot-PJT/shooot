package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiTestCaseRequestRepository extends JpaRepository<ApiTestCaseRequest, Integer> {
}
