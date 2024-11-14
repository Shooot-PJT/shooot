package com.shooot.application.projecttest.event.handler;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.projecttest.event.dto.ProjectTestRequestedEvent;
import com.shooot.application.stresstest.service.StressTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class ProjectStressTestHandler {

    private final ApiRepository apiRepository;
    private final StressTestService stressTestService;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void stressTest(ProjectTestRequestedEvent event) {
        event.getApiId().forEach(apiId -> {
            Api api = apiRepository.findById(apiId).orElseThrow(ApiNotFoundException::new);
            stressTestService.
        });
    }
}
