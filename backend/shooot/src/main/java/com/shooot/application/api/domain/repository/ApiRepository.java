package com.shooot.application.api.domain.repository;

import com.shooot.application.api.domain.Api;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiRepository extends JpaRepository<Api, Integer> {
}
