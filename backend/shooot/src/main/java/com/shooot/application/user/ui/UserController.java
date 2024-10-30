package com.shooot.application.user.ui;

import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.user.service.command.UserModifyService;
import com.shooot.application.user.service.dto.UserInfoModifyRequest;
import com.shooot.application.user.service.query.UserFindService;
import com.shooot.application.user.ui.dto.UserView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Void> UserInfoUpdate(@RequestBody UserInfoModifyRequest request,
        @AuthenticationPrincipal UserLoginContext context) {
        userModifyService.userInfoUpdate(request, context.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<UserView> findByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userFindService.findByEmail(email));
    }
}
