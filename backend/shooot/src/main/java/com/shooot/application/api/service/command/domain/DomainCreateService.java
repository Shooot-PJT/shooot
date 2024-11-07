package com.shooot.application.api.service.command.domain;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.service.command.domain.dto.DomainCreateRequest;
import com.shooot.application.api.ui.dto.DomainView;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DomainCreateService {
    private final DomainRepository domainRepository;
    private final ProjectRepository projectRepository;

    public DomainView createService(DomainCreateRequest domainCreateRequest){
        //todo : 프로젝트 없을때 예외처리
        Project project = projectRepository.findById(domainCreateRequest.getProjectId())
                .orElseThrow(ProjectNotFoundException::new);

        Domain domain = Domain.builder()
                .project(project)
                .name(domainCreateRequest.getTitle())
                .description(domainCreateRequest.getDescription())
                .build();

        Domain saveDomain = domainRepository.save(domain);

        return DomainView.from(saveDomain);
    }

}
