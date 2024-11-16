package com.shooot.application.api.service.command.subscribe;

import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.DomainSubscribe;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.domain.repository.DomainSubscribeRepository;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.exception.subscribe.DomainNotSubscribeException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubscribeDeleteService {
    private final DomainSubscribeRepository domainSubscribeRepository;
    private final UserRepository userRepository;
    private final DomainRepository domainRepository;

    @Transactional
    public void deleteDomainSubscribe(Integer userId, Integer domainId){
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        Domain domain = domainRepository.findById(domainId)
                .orElseThrow(DomainNotFoundException::new);

        DomainSubscribe domainSubscribe = domainSubscribeRepository.findDomainSubscribeByUserIdAndDomainId(userId, domainId)
                .orElseThrow(DomainNotSubscribeException::new);

        domainSubscribeRepository.deleteById(domainSubscribe.getId());
    }

}
