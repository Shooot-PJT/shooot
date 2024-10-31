package com.shooot.dockermanager.domain.projecttest.repository;


import com.shooot.dockermanager.domain.projecttest.ApiTestMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiTestMethodRepository extends JpaRepository<ApiTestMethod, Integer> {

    List<ApiTestMethod> findAllByApiIdIn(List<Integer> apis);
}
