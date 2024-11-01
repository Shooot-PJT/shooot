package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestLog;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ApiTestLogRepository extends JpaRepository<ApiTestLog, UUID> {

//    Slice<> findFilteredTestLog()
}
