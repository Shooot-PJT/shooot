package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DomainRepository extends JpaRepository<Domain, Integer> {
    List<Domain> findByProjectId(Integer projectId);
}
