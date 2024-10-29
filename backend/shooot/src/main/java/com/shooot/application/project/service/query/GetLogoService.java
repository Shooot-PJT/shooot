package com.shooot.application.project.service.query;

import com.shooot.application.common.infra.storage.service.FileStorageService;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class GetLogoService {

    private final ProjectRepository projectRepository;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public ResponseEntity<Resource> getLogo(Integer projectId) {
        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(ProjectNotFoundException::new);
        return fileStorageService.downloadFile(project.getLogoImageFile());
    }
}
