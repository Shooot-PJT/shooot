package com.shooot.application.api.service.command.domain;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.service.command.domain.dto.DomainModifyRequest;
import com.shooot.application.api.ui.dto.DomainView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DomainModifyService {
    private final DomainRepository domainRepository;

    @Transactional
    public DomainView modifyDomain(Integer domainId, DomainModifyRequest domainModifyRequest){
        Domain domain = domainRepository.findById(domainId)
                .orElseThrow(DomainNotFoundException::new);

        domain.update(domainModifyRequest);

        return DomainView.from(domain);
    }

}
