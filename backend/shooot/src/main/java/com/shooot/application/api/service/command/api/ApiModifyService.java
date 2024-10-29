package com.shooot.application.api.service.command.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.service.command.api.dto.ApiModifyRequest;
import com.shooot.application.api.service.command.api.dto.ApiToggleModifyRequest;
import com.shooot.application.api.ui.dto.ApiView;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApiModifyService {
    private final ApiRepository apiRepository;
    private final ProjectParticipantRepository participantRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApiView modifyApi(Integer apiId, ApiModifyRequest apiModifyRequest){
        Api api = findApiById(apiId);

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

    private User findUserById(Integer managerId){
        return userRepository.findById(managerId)
                .orElseThrow(UserNotFoundException::new);
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
