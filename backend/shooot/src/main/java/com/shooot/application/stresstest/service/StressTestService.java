package com.shooot.application.stresstest.service;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.projecttest.domain.BuildFileTestMethod;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.StressTestLog;
import com.shooot.application.projecttest.domain.StressTestStatus;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.domain.repository.StressTestLogRepository;
import com.shooot.application.projecttest.service.dto.ApiTestMethodRequest;
import com.shooot.application.projecttest.service.dto.ProjectBuildTestRunRequest;
import com.shooot.application.stresstest.subscriber.StressTestSubscriber;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class StressTestService {

    private final ProjectBuildRepository projectBuildRepository;
    private final StressTestSubscriber stressTestSubscriber;
    private final StressTestLogRepository stressTestLogRepository;
    private final ApiRepository apiRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String requestUrl = "http://khj745700.iptime.org:8080/stress-test/start";
    private final String stopRequestUrl = "http://khj745700.iptime.org:8080/stress-test/stop";
    private final StressTestSseService stressTestSseService;
    private final Map<Integer, Thread> isRunning = new ConcurrentHashMap<>();

    public void start(ProjectBuildTestRunRequest request) {
        ProjectBuild projectBuild = projectBuildRepository.findById(request.getProjectJarFileId())
            .orElseThrow();
        Integer projectId = projectBuild.getProject().getId();

        stressTestSubscriber.addSubscription(projectId);

        StressTestLog stressTestLog = StressTestLog.builder()
            .projectBuild(projectBuild)
            .status(StressTestStatus.DONE)
            .build();
        stressTestLogRepository.save(stressTestLog);

        stressTestSseService.start(request.getProjectJarFileId());

        Thread thread = new Thread(() -> {
            for (ApiTestMethodRequest apiTestMethodRequest : request.getEndPointSettings()) {
                Api api = apiRepository.findById(apiTestMethodRequest.getApiId()).orElseThrow(
                    ApiNotFoundException::new);

                StressTestStartRequest stressTestStartRequest = StressTestStartRequest.builder()
                    .projectId(projectId)
                    .projectJarFileId(request.getProjectJarFileId())
                    .stressTestLogId(stressTestLog.getId())
                    .httpMethod(api.getMethod())
                    .url(api.getUrl())
                    .numberOfThreads(apiTestMethodRequest.getVuserNum())
                    .duration(apiTestMethodRequest.getDuration())
                    .testMethod(BuildFileTestMethod.valueOf(apiTestMethodRequest.getMethod()))
                    .build();

                restTemplate.postForObject(requestUrl, stressTestStartRequest, Void.class);

                try {
                    Thread.sleep(apiTestMethodRequest.getDuration() * 1000);
                } catch (InterruptedException e) {
                    System.out.println("interrupted");
                    throw new RuntimeException(e);
                }
            }

            stop(projectId, request.getProjectJarFileId());
        });
        thread.start();

        isRunning.put(request.getProjectJarFileId(), thread);
        System.out.println(isRunning);
    }

    public void stop(Integer projectId, Integer projectJarFileId) {
        StressTestStopRequest stressTestStopRequest = StressTestStopRequest.builder()
            .projectJarFileId(projectJarFileId)
            .build();
        restTemplate.postForObject(stopRequestUrl, stressTestStopRequest, Void.class);
        stressTestSubscriber.removeSubscription(projectId);
        stressTestSseService.end(projectJarFileId);
        System.out.println(projectJarFileId);
        Thread thread = isRunning.get(projectJarFileId);
        thread.interrupt();
        isRunning.remove(projectJarFileId);
    }
}
