package com.shooot.application.project.service.query;

import com.shooot.application.project.ui.dto.GetStressTestLogResponse;
import com.shooot.application.projecttest.controller.dto.ProjectBuildView;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.StressTestLog;
import com.shooot.application.projecttest.domain.StressTestResult;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.domain.repository.StressTestLogRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class GetStressTestLogService {

    private final ProjectBuildRepository projectBuildRepository;
    private final StressTestLogRepository stressTestLogRepository;

    @Transactional(readOnly = true)
    public List<GetStressTestLogResponse> getStressTestLog(Integer projectId) {
        List<GetStressTestLogResponse> stressTestLogResponses = new ArrayList<>();
        List<ProjectBuildView> projectBuilds = projectBuildRepository.findAllByProject_Id(
            projectId);
        for (ProjectBuildView projectBuildView : projectBuilds) {
            ProjectBuild projectBuild = projectBuildRepository.findById(
                projectBuildView.getProjectJarFileId()).orElseThrow();
            List<StressTestLog> StressTestLogs = stressTestLogRepository.findByProjectBuild(
                projectBuild);
            for (StressTestLog stressTestLog : StressTestLogs) {

                Integer duration = 0;
                for (StressTestResult stressTestResult : stressTestLog.getStressTestResults()) {
                    duration += stressTestResult.getDuration();
                }

                stressTestLogResponses.add(GetStressTestLogResponse.builder()
                    .stressTestLogId(stressTestLog.getId())
                    .title(projectBuildView.getFileName()
                        .concat("-".concat(projectBuildView.getVersion().getVersion())))
                    .startTime(stressTestLog.getCreatedAt())
                    .status(stressTestLog.getStatus().toString())
                    .count(stressTestLog.getStressTestResults().size())
                    .duration(duration)
                    .build());
            }
        }

        return stressTestLogResponses;
    }
}
