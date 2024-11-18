package com.shooot.application.notification.service;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.DomainSubscribe;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.domain.repository.DomainSubscribeRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.notification.domain.Notification;
import com.shooot.application.notification.domain.repository.NotificationRepository;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationCreateService {
    private final UserRepository userRepository;
    private final DomainRepository domainRepository;
    private final NotificationRepository notificationRepository;
    private final ProjectRepository projectRepository;
    private final ApiRepository apiRepository;
    private final DomainSubscribeRepository domainSubscribeRepository;
    private final NotificationSendService notificationSendService;


    @Transactional
    public void saveNotification(Integer userId, Integer apiId, String type){
        //구독이 되어 있는지를 체크하고 구독이 되어 있으면 알림을 보낸다

//        User user = userRepository.findById(userId)
//                .orElseThrow(UserNotFoundException::new);

        Api api = apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);

        Domain domain = domainRepository.findById(api.getDomain().getId())
                .orElseThrow(DomainNotFoundException::new);

        Project project = projectRepository.findById(domain.getProject().getId())
                .orElseThrow(ProjectNotFoundException::new);

        List<DomainSubscribe> domainSubscribes = domainSubscribeRepository.findAllSubscribers(domain.getId());

        for (DomainSubscribe subscribe : domainSubscribes) {
            User subscriber = subscribe.getUser(); // DomainSubscribe의 user 객체 가져오기

            if(userId.equals(subscriber.getId())) continue;

            Map<String, Object> messageContent = Map.of(
                    "message", type,
                    "project", Map.of(
                            "id", project.getId(),
                            "name", project.getName()
                    ),
                    "domain", Map.of(
                            "id", domain.getId(),
                            "name", domain.getName()
                    ),
                    "api", Map.of(
                            "id", api.getId(),
                            "name", api.getTitle()
                    )
            );

            Notification notification = Notification.builder()
                    .user(subscriber) // 현재 반복 중인 user 설정
                    .content(messageContent)
                    .isRead(false)
                    .build();

            notificationRepository.save(notification); // Notification 저장
            notificationSendService.notificationAtDomainUpdate(subscriber.getId(), notification);


        }
    }


}
