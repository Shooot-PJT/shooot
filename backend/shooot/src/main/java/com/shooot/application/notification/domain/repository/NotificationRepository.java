package com.shooot.application.notification.domain.repository;

import com.shooot.application.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {


}
