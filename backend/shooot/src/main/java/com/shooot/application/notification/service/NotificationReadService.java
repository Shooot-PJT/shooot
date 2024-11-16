package com.shooot.application.notification.service;

import com.shooot.application.notification.domain.Notification;
import com.shooot.application.notification.domain.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationReadService {
    private final NotificationRepository notificationRepository;

    public void readNotification(UUID notificationId){
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow();


    }
}
