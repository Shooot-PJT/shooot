package com.shooot.application.user.ui;

import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.user.service.command.SignupService;
import com.shooot.application.user.service.command.UserModifyService;
import com.shooot.application.user.service.dto.EmailVerificationNumberRequest;
import com.shooot.application.user.service.dto.EmailVerificationRequest;
import com.shooot.application.user.service.dto.SignupRequest;
import com.shooot.application.user.service.dto.UserInfoModifyRequest;
import com.shooot.application.user.service.query.EmailValidationService;
import com.shooot.application.user.service.query.UserFindService;
import com.shooot.application.user.ui.dto.EmailIsValidView;
import com.shooot.application.user.ui.dto.UserView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserFindService userFindService;
    private final UserModifyService userModifyService;

    @GetMapping("/info")
    public ResponseEntity<UserView> findById(@AuthenticationPrincipal UserLoginContext context) {
        UserView byUserId = userFindService.findByUserId(context.getUserId());
        return ResponseEntity.ok(byUserId);
    }

    @PatchMapping("/info")
    public ResponseEntity<Void> UserInfoUpdate(@RequestBody UserInfoModifyRequest request, @AuthenticationPrincipal UserLoginContext context) {
        userModifyService.userInfoUpdate(request, context.getUserId());
        return ResponseEntity.ok().build();
    }
}
