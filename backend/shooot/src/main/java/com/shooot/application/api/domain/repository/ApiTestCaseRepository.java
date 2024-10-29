package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiTestCaseRepository extends JpaRepository<ApiTestCase, Integer> {
}
