package com.shooot.application.api.service.query.domain;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.domain.repository.DomainSubscribeRepository;
import com.shooot.application.api.ui.dto.DomainView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DomainListService {
    private final DomainRepository domainRepository;
    private final DomainSubscribeRepository domainSubscribeRepository;

    public List<DomainView> getDomainList(Integer projectId, Integer userId){
        List<Domain> domains = domainRepository.findByProjectIdAndNotDeleted(projectId);

        return domains.stream()
                .map(domain -> {
                    boolean isSubscribed = domainSubscribeRepository.findDomainSubscribeByUserIdAndDomainId(userId, domain.getId())
                            .isPresent();

                    return DomainView.builder()
                            .domainId(domain.getId())
                            .projectId(domain.getProject().getId())
                            .title(domain.getName())
                            .description(domain.getDescription())
                            .isSubscribe(isSubscribed)
                            .build();

                }).toList();



//        return domains.stream()
//                .map(domain -> DomainView.builder()
//                        .domainId(domain.getId())
//                        .projectId(domain.getProject().getId())
//                        .title(domain.getName())
//                        .description(domain.getDescription())
//                        .build()
//                ).collect(Collectors.toList());
    }


}
