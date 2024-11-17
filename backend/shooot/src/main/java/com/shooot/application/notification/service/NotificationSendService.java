package com.shooot.application.notification.service;

import com.shooot.application.api.domain.DomainSubscribe;
import com.shooot.application.api.domain.repository.DomainSubscribeRepository;
import com.shooot.application.notification.domain.Notification;
import com.shooot.application.notification.domain.repository.NotificationRepository;
import com.shooot.application.notification.ui.dto.NotificationView;
import com.shooot.application.sseemitter.service.LoginUserSseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationSendService {
    private final NotificationRepository notificationRepository;
    private final LoginUserSseService loginUserSseService;
    private final DomainSubscribeRepository domainSubscribeRepository;


    public void notificationAtLogin(Integer userId){
        List<Notification> notificationList = notificationRepository.findByUserId(userId);

        for(Notification notification : notificationList){
            NotificationView notificationView = NotificationView.builder()
                    .id(notification.getId())
                    .isRead(notification.getIsRead())
                    .createdAt(notification.getCreatedAt())
                    .message(notification.getContent())
                    .build();

            loginUserSseService.send(userId, notificationView);
        }

    }

    public void notificationAtDomainUpdate(Integer userId, Notification notification){
        // 도메인 아이디로 구독되어있는 유저에게 다 보내기

        NotificationView notificationView = NotificationView.builder()
                .id(notification.getId())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .message(notification.getContent())
                .build();

        loginUserSseService.send(userId, notificationView);
    }


}
