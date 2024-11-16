package com.shooot.application.projecttest.event.handler;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.projecttest.domain.ApiTestMethod;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.repository.ApiTestMethodRepository;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.event.dto.ProjectTestRequestedEvent;
import com.shooot.application.projecttest.subscriber.ProjectMonitorStreamSubscriber;
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
    private final ApiTestMethodRepository apiTestMethodRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private final ProjectMonitorStreamSubscriber projectMonitorStreamSubscriber;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void stressTest(ProjectTestRequestedEvent event) {
        ProjectBuild projectBuild = projectBuildRepository.findById(event.getProjectJarFileId())
            .orElseThrow();

        String baseUrl = "https://%s.shooot.shop".formatted(
            projectBuild.getProject().getEnglishName());

        projectMonitorStreamSubscriber.addSubscriptionForProject(
            projectBuild.getProject().getId());

        event.getApiId().forEach(apiId -> {
            Api api = apiRepository.findById(apiId).orElseThrow(ApiNotFoundException::new);
            ApiTestMethod apiTestMethod = apiTestMethodRepository.findByApi(api).orElseThrow();

            switch (apiTestMethod.getBuildFileTestMethod()) {
                case FIXED -> stressTestService.fixed(baseUrl, api, apiTestMethod.getVUsers(),
                    apiTestMethod.getTestDuration());
                case SPIKE -> stressTestService.spike(baseUrl, api, apiTestMethod.getVUsers(),
                    apiTestMethod.getTestDuration());
                case RAMP_UP -> stressTestService.rampUp(baseUrl, api, apiTestMethod.getVUsers(),
                    apiTestMethod.getTestDuration());
            }

            try {
                Thread.sleep(apiTestMethod.getTestDuration());
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });

        projectMonitorStreamSubscriber.removeSubscriptionForProject(
            projectBuild.getProject().getId());
    }
}
