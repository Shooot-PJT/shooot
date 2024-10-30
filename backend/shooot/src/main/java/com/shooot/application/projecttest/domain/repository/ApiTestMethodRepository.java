package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.api.domain.Api;
import com.shooot.application.projecttest.domain.ApiTestMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiTestMethodRepository extends JpaRepository<ApiTestMethod, Integer> {

    List<ApiTestMethod> findAllByApiIn(List<Api> apis);
    List<ApiTestMethod> findAllByApi_IdIn(List<Integer> apis);
}
