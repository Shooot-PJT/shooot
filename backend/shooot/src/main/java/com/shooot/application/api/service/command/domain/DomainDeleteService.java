package com.shooot.application.api.service.command.domain;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DomainDeleteService {
    private final DomainRepository domainRepository;

    @Transactional
    public void deleteDomain(Integer domainId){
        Domain domain = domainRepository.findById(domainId)
                .orElseThrow(DomainNotFoundException::new);

        domain.delete();
    }
}
