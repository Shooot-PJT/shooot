package com.shooot.application.projecttest.service.command;

import com.shooot.application.projecttest.service.dto.ProjectTestStopRequest;
import com.shooot.application.stresstest.service.StressTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class ProjectTestStopService {

    private final StressTestService stressTestService;
    private final RestTemplate restTemplate = new RestTemplate();
    private String requestUrl = "http://khj745700.iptime.org:8080/stress-test/stop";

    public void stop(Integer jarFileId) {
        ProjectTestStopRequest request = ProjectTestStopRequest.builder()
            .projectJarFileId(jarFileId)
            .build();
        restTemplate.postForObject(requestUrl, request, Void.class);
        stressTestService.stop(jarFileId);
    }
}
