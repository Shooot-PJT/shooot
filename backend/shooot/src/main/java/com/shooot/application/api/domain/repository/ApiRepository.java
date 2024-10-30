package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.Api;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiRepository extends JpaRepository<Api, Integer> {

    List<Api> findAllByDomain_Project_Id(Integer projectId);
}
