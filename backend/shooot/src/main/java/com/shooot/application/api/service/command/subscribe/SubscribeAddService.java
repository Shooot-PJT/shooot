package com.shooot.application.api.service.command.subscribe;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.DomainSubscribe;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.domain.repository.DomainSubscribeRepository;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.exception.subscribe.DomainSubscribeException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscribeAddService {
    private final UserRepository userRepository;
    private final DomainSubscribeRepository domainSubscribeRepository;
    private final DomainRepository domainRepository;

    @Transactional
    public void addDomainSubscribe(Integer userId, Integer domainId){
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        Domain domain = domainRepository.findById(domainId)
                .orElseThrow(DomainNotFoundException::new);

        Optional<DomainSubscribe> isDomainSubscribe = domainSubscribeRepository.findDomainSubscribeByUserIdAndDomainId(userId, domainId);

        if(isDomainSubscribe.isPresent()) throw new DomainSubscribeException();

        DomainSubscribe domainSubscribe = DomainSubscribe.builder()
                .domain(domain)
                .user(user)
                .build();

        domainSubscribeRepository.save(domainSubscribe);
    }


}
