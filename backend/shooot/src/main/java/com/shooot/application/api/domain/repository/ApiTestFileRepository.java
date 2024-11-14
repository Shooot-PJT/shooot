package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ApiTestFileRepository extends JpaRepository<ApiTestFile, UUID> {

}
