package com.shooot.application.api.service.command.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.domain.repository.DomainSubscribeRepository;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.service.command.api.dto.ApiCreateRequest;
import com.shooot.application.api.ui.dto.ApiView;
import com.shooot.application.notification.domain.repository.NotificationRepository;
import com.shooot.application.notification.service.NotificationCreateService;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.project.exception.ProjectPermissionDeniedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApiCreateService {
    private final ApiRepository apiRepository;
    private final DomainRepository domainRepository;
    private final ProjectParticipantRepository projectParticipantRepository;
    private final NotificationCreateService notificationCreateService;

    @Transactional
    public ApiView createApi(Integer domainId, ApiCreateRequest apiCreateRequest, Integer userId){
        Domain domain = domainRepository.findById(domainId)
                .orElseThrow(DomainNotFoundException::new);

        //todo : 해당 프로젝트 참가자의 id가 없을때의 예외
        // 도메인 타고 들어가서 해당 프로젝트 ID 찾아서 프로젝트 ID에 해당 userId가 있는지 체크해야됨
//        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectIdAndUserId(domain.getProject().getId(), apiCreateRequest.getManagerId());
        ProjectParticipant projectParticipant = projectParticipantRepository.findById(apiCreateRequest.getManagerId())
                .orElseThrow(ProjectParticipantNotFoundException::new);

        checkPermission(domain, projectParticipant);

        Api api = Api.builder()
                .domain(domain)
                .projectParticipant(projectParticipant)
                .title(apiCreateRequest.getTitle())
                .description(apiCreateRequest.getDescription())
                .url(apiCreateRequest.getUrl().orElse(null))
                .build();

        Api saveApi = apiRepository.save(api);
        notificationCreateService.saveNotification(userId, saveApi.getId());

        return ApiView.from(saveApi);
    }

    private void checkPermission(Domain domain, ProjectParticipant projectParticipant){
        if(!domain.getProject().getId().equals(projectParticipant.getProject().getId())){
            throw new ProjectPermissionDeniedException();
        }
    }

}
