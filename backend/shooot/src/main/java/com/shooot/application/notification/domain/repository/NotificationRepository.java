package com.shooot.application.notification.domain.repository;

import com.shooot.application.api.domain.Api;
import com.shooot.application.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    @Query("SELECT n FROM Notification n WHERE n.user.id = :userId")
    List<Notification> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.id = :userId AND isRead = false")
    Integer countByUserId(@Param("userId") Integer userId);


}
