package com.shooot.application.user.service.query;

import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import com.shooot.application.user.ui.dto.EmailIsValidView;
import com.shooot.application.user.ui.dto.UserView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserFindService {
    private final UserRepository userRepository;

    public EmailIsValidView existByUsername(String email) {
        Boolean b = userRepository.existsByUsername(email);
        return EmailIsValidView.builder().isValid(!b).build();
    }

    public UserView findByUserId(Integer userId) {
        User target = userRepository.findByIdAndIsDeletedFalse(userId).orElseThrow(UserNotFoundException::new);
        return UserView.from(target);
    }


}
