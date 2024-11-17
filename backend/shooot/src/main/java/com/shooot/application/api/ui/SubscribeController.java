package com.shooot.application.api.ui;

import com.shooot.application.api.service.command.subscribe.SubscribeAddService;
import com.shooot.application.api.service.command.subscribe.SubscribeDeleteService;
import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class SubscribeController {
    private final SubscribeAddService subscribeAddService;
    private final SubscribeDeleteService subscribeDeleteService;

    @PostMapping("/domains/{domainId}/subscribe")
    public ResponseEntity<?> addSubscribe(
            @PathVariable("domainId") Integer domainId,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        subscribeAddService.addDomainSubscribe(userId, domainId);

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/domains/{domainId}/subscribe")
    public ResponseEntity<?> removeSubscribe(
            @PathVariable("domainId") Integer domainId,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        subscribeDeleteService.deleteDomainSubscribe(userId, domainId);

        return ResponseEntity.ok(null);
    }



}
