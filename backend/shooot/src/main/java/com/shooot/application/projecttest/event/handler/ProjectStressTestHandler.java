package com.shooot.application.projecttest.event.handler;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.projecttest.event.dto.ProjectTestRequestedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Component
public class ProjectStressTestHandler {

    private final ApiRepository apiRepository;
    private final WebClient webClient;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void stressTest(ProjectTestRequestedEvent event) {

        event.getApiId().stream().forEach(apiId -> {
            Api api = apiRepository.findById(apiId).orElseThrow(ApiNotFoundException::new);
            webClient.method(HttpMethod.valueOf(api.getMethod())).uri(api.getUrl()).retrieve();
        });
    }
}
