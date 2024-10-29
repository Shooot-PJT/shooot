package com.shooot.application.project.service.query;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.ui.dto.ProjectView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProjectFindService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public ProjectView findByProjectId(Integer projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        return ProjectView.from(project);
    }
}
