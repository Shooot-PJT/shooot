package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestLog;
import com.shooot.application.api.ui.dto.ApiTestLastLogView;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApiTestLogRepository extends JpaRepository<ApiTestLog, UUID> {

//    Slice<> findFilteredTestLog()

    @Query("SELECT log FROM ApiTestLog log " +
            "WHERE log.apiTestCase IN (" +
            "    SELECT tc FROM ApiTestCase tc " +
            "    WHERE tc.api.id = :apiId" +
            ") " +
            "AND log.createdAt = (" +
            "    SELECT MAX(l.createdAt) " +
            "    FROM ApiTestLog l " +
            "    WHERE l.apiTestCase IN (" +
            "        SELECT tc FROM ApiTestCase tc WHERE tc.api.id = :apiId" +
            "    )" +
            ")")
    Optional<ApiTestLog> findLatestTestLogByApiId(@Param("apiId") Integer apiId);
}
