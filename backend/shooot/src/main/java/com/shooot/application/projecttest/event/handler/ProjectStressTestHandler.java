package com.shooot.application.projecttest.event.handler;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.projecttest.domain.ApiTestMethod;
import com.shooot.application.projecttest.domain.repository.ApiTestMethodRepository;
import com.shooot.application.projecttest.event.dto.ProjectTestRequestedEvent;
import com.shooot.application.sseemitter.service.StressTestSseService;
import com.shooot.application.stresstest.controller.dto.StressTestDto;
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
    private final StressTestSseService stressTestSseService;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void stressTest(ProjectTestRequestedEvent event) {
        event.getApiId().forEach(apiId -> {
            Api api = apiRepository.findById(apiId).orElseThrow(ApiNotFoundException::new);
            ApiTestMethod apiTestMethod = apiTestMethodRepository.findByApi(api).orElseThrow();

            switch (apiTestMethod.getBuildFileTestMethod()) {
                case FIXED -> stressTestService.fixed(api, apiTestMethod.getVUsers(),
                    apiTestMethod.getTestDuration());
                case SPIKE -> stressTestService.spike(api, apiTestMethod.getVUsers(),
                    apiTestMethod.getTestDuration());
                case RAMP_UP -> stressTestService.rampUp(api, apiTestMethod.getVUsers(),
                    apiTestMethod.getTestDuration());
            }

            long currentTime = System.currentTimeMillis();
            long endTime = currentTime + apiTestMethod.getTestDuration() * 1000;

            while (System.currentTimeMillis() < endTime) {
                StressTestDto data = stressTestService.getData(event.getProjectJarFileId());
                stressTestSseService.send(event.getProjectJarFileId(), data);
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }
}