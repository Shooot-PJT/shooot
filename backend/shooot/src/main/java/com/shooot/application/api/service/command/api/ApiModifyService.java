package com.shooot.application.api.service.command.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.service.command.api.dto.ApiModifyRequest;
import com.shooot.application.api.service.command.api.dto.ApiToggleModifyRequest;
import com.shooot.application.api.ui.dto.ApiView;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.project.exception.ProjectPermissionDeniedException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ApiModifyService {
    private final ApiRepository apiRepository;
    private final ProjectParticipantRepository participantRepository;
    private final UserRepository userRepository;
    private final DomainRepository domainRepository;

    @Transactional
    public ApiView modifyApi(Integer apiId, ApiModifyRequest apiModifyRequest){
        Api api = findApiById(apiId);

//        checkPermission(api);

        if(apiModifyRequest.getManagerId() != null){
            //todo user 없을때 예외 던지기
            updateApiManager(api.getProjectParticipant().getId(), apiModifyRequest.getManagerId());
        }

        api.update(apiModifyRequest);

        return ApiView.from(api);
    }

    @Transactional
    public ApiView modifyApiToggle(Integer apiId, ApiToggleModifyRequest apiToggleModifyRequest){
        Api api = findApiById(apiId);

        api.update(apiToggleModifyRequest);

        return ApiView.from(api);
    }

    private void checkPermission(Api api){
        Domain domain = domainRepository.findById(api.getDomain().getId())
                .orElseThrow(DomainNotFoundException::new);

        ProjectParticipant projectParticipant = participantRepository.findById(api.getProjectParticipant().getId())
                .orElseThrow(ProjectNotFoundException::new);

        if(!domain.getProject().getId().equals(projectParticipant.getProject().getId())){
            throw new ProjectPermissionDeniedException();
        }
    }

    private User findUserById(Integer managerId){
        return userRepository.findById(managerId)
                .orElseThrow(ProjectPermissionDeniedException::new);
    }

    private Api findApiById(Integer apiId){
        return apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);
    }

    private ProjectParticipant findProjectParticipantById(Integer participantId){
        return participantRepository
                .findById(participantId)
                .orElseThrow();
    }

    private void updateApiManager(Integer participantId, Integer managerId){
        ProjectParticipant projectParticipant = findProjectParticipantById(participantId);
        User user = findUserById(managerId);

        projectParticipant.update(user);
    }
}
