package com.shooot.application.user.ui;

import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.user.service.command.UserModifyService;
import com.shooot.application.user.service.dto.UserInfoModifyRequest;
import com.shooot.application.user.service.query.UserFindService;
import com.shooot.application.user.ui.dto.FindByEmailView;
import com.shooot.application.user.ui.dto.UserView;
import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<Void> UserInfoUpdate(@RequestBody UserInfoModifyRequest request,
        @AuthenticationPrincipal UserLoginContext context) {
        userModifyService.userInfoUpdate(request, context.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<FindByEmailView> findByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userFindService.findByEmail(email));
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal UserLoginContext userLoginContext, HttpServletRequest httpServletRequest) {
        httpServletRequest.getSession().invalidate();
        return ResponseEntity.ok().build();
    }
}
