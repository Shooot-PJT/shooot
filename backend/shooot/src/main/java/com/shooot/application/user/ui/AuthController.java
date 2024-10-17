package com.shooot.application.user.ui;

import com.shooot.application.user.service.command.SignupService;
import com.shooot.application.user.service.dto.EmailVerificationNumberRequest;
import com.shooot.application.user.service.dto.EmailVerificationRequest;
import com.shooot.application.user.service.dto.SignupRequest;
import com.shooot.application.user.service.query.EmailValidationService;
import com.shooot.application.user.service.query.UserFindService;
import com.shooot.application.user.ui.dto.EmailIsValidView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {
    private final EmailValidationService emailValidationService;
    private final UserFindService userFindService;
    private final SignupService signupService;


    @GetMapping("/email/{email}/can-use")
    public ResponseEntity<EmailIsValidView> validEmail(@PathVariable(name = "email") String email) {
        return ResponseEntity.ok(userFindService.existByUsername(email));
    }

    @PostMapping("/email/verification-check-request")
    public ResponseEntity<Void> emailVerificationNumberRequest(@RequestBody EmailVerificationNumberRequest request) {
        emailValidationService.emailVerificationRequest(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email/verification-check")
    public ResponseEntity<EmailIsValidView> emailVerification(@RequestBody EmailVerificationRequest request) {
        EmailIsValidView emailIsValidView = emailValidationService.emailVerify(request);
        return ResponseEntity.ok(emailIsValidView);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        signupService.signup(request);
        return ResponseEntity.ok().build();
    }

}
