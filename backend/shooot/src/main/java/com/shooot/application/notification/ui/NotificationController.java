package com.shooot.application.notification.ui;

import com.shooot.application.notification.service.NotificationCountService;
import com.shooot.application.notification.service.NotificationReadService;
import com.shooot.application.notification.service.NotificationSendService;
import com.shooot.application.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationCountService notificationCountService;
    private final NotificationReadService notificationReadService;
    private final NotificationSendService notificationSendService;


    @GetMapping("/count")
    public ResponseEntity<?> getNotificationCount(
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        Integer messageCount = notificationCountService.getNotificationCount(userId);

        return ResponseEntity.ok(messageCount);
    }

    @PostMapping("/{notificationId}")
    public ResponseEntity<?> getNotification(
            @AuthenticationPrincipal UserLoginContext userLoginContext,
            @PathVariable UUID notificationId
    ){
        notificationReadService.readNotification(notificationId);

        return ResponseEntity.ok(null);
    }

    @GetMapping()
    public ResponseEntity<?> getNotificationList(
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        notificationSendService.notificationAtLogin(userId);

        return ResponseEntity.ok(null);
    }

}
