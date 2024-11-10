package com.shooot.application.user.service.command;

import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserExistException;
import com.shooot.application.user.service.query.EmailValidationService;
import com.shooot.application.user.service.query.UserFindService;
import com.shooot.application.user.service.dto.SignupRequest;
import com.shooot.application.user.ui.dto.EmailIsValidView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SignupService {
    private final UserFindService userFindService;
    private final EmailValidationService emailValidationService;
    private final UserRepository userRepository;


    @Transactional
    public void signup(SignupRequest request) {
        EmailIsValidView emailIsValidView = userFindService.existByUsername(request.getEmail());

        if(!emailIsValidView.getIsValid()) {
            throw new UserExistException();
        }

        emailValidationService.emailCanUseValidCheck(request.getEmail());
        emailValidationService.emailValidCheckRemove();

        User user = toUser(request);
        userRepository.save(user);
    }

    private User toUser(SignupRequest signupRequest) {
        return User.create(signupRequest);
    }

}
