package com.shooot.application.api.service.query.domain;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.ui.dto.DomainView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DomainListService {

    private final DomainRepository domainRepository;

    public List<DomainView> getDomainList(Integer projectId){
        List<Domain> domains = domainRepository.findByProjectId(projectId);

        return domains.stream()
                .map(domain -> DomainView.builder()
                        .domainId(domain.getId())
                        .projectId(domain.getProject().getId())
                        .title(domain.getName())
                        .description(domain.getDescription())
                        .build()
                ).collect(Collectors.toList());
    }


}
