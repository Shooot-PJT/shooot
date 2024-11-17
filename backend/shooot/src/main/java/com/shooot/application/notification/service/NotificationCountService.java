package com.shooot.application.notification.service;

import com.shooot.application.notification.domain.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationCountService {
    private final NotificationRepository notificationRepository;

    public Integer getNotificationCount(Integer userId){
        return notificationRepository.countByUserId(userId);
    }

}
