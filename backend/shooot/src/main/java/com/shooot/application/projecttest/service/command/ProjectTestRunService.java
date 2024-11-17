package com.shooot.application.projecttest.service.command;

import com.shooot.application.common.events.Events;
import com.shooot.application.projecttest.domain.ApiTestMethod;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.StressTestLog;
import com.shooot.application.projecttest.domain.StressTestStatus;
import com.shooot.application.projecttest.domain.repository.ApiTestMethodRepository;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.domain.repository.StressTestLogRepository;
import com.shooot.application.projecttest.event.dto.ProjectTestRequestedEvent;
import com.shooot.application.projecttest.exception.TestAlreadyRunningException;
import com.shooot.application.projecttest.service.dto.ApiTestMethodRequest;
import com.shooot.application.projecttest.service.dto.ProjectBuildTestRunRequest;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectTestRunService {

    private final ApiTestMethodRepository apiTestMethodRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private final ConcurrentHashMap<Integer, Integer> running = new ConcurrentHashMap<>();
    private final StressTestLogRepository stressTestLogRepository;

    @Transactional
    public void testRunRequest(ProjectBuildTestRunRequest request) {

        if (running.containsKey(request.getProjectJarFileId())) {
            throw new TestAlreadyRunningException();
        }

        // TODO: 실제 배포 여부

        ProjectBuild projectBuild = projectBuildRepository.findById(request.getProjectJarFileId())
            .orElseThrow();

        StressTestLog stressTestLog = StressTestLog.builder()
            .projectBuild(projectBuild)
            .status(StressTestStatus.DONE)
            .build();

        stressTestLogRepository.save(stressTestLog);

        List<Integer> apiIds = request.getEndPointSettings().stream()
            .map(ApiTestMethodRequest::getApiId).toList();
        List<ApiTestMethod> allByApiIdIn = apiTestMethodRepository.findAllByApi_IdIn(apiIds);

        allByApiIdIn.forEach(apiTestMethod -> {
            ApiTestMethodRequest apiTestMethodRequest = request.getEndPointSettings().stream()
                .filter(endPointSettiongs -> Objects.equals(endPointSettiongs.getApiId(),
                    apiTestMethod.getApi().getId())).findFirst().get();
            apiTestMethod.update(apiTestMethodRequest);
        });

        running.put(request.getProjectJarFileId(), 0);

        Events.raise(new ProjectTestRequestedEvent(apiIds, request.getProjectJarFileId(),
            stressTestLog.getId()));
    }

    public void finish(Integer projectJarFileId) {
        running.remove(projectJarFileId);
    }
}
