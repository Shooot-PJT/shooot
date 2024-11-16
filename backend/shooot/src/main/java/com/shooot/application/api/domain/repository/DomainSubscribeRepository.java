package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.DomainSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DomainSubscribeRepository extends JpaRepository<DomainSubscribe, Integer> {

    @Query("SELECT s FROM DomainSubscribe s WHERE s.user.id = :userId AND s.domain.id = :domainId")
    Optional<DomainSubscribe> findDomainSubscribeByUserIdAndDomainId(Integer userId, Integer domainId);
}
