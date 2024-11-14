package com.shooot.application.projecttest.domain.repository;

import com.shooot.application.api.domain.Api;
import com.shooot.application.projecttest.domain.ApiTestMethod;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiTestMethodRepository extends JpaRepository<ApiTestMethod, Integer> {

    List<ApiTestMethod> findAllByApiIn(List<Api> apis);

    List<ApiTestMethod> findAllByApi_IdIn(List<Integer> apis);

    Optional<ApiTestMethod> findByApi(Api api);
}
