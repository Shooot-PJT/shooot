package com.shooot.application.notification.service;

import com.shooot.application.notification.domain.Notification;
import com.shooot.application.notification.domain.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationReadService {
    private final NotificationRepository notificationRepository;

    @Transactional
    public void readNotification(UUID notificationId){
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow();

        notification.read();
    }
}
