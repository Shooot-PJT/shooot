package com.shooot.application.user.service.command;


import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import com.shooot.application.user.service.dto.UserInfoModifyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserModifyService {
    private final UserRepository userRepository;

    @Transactional
    public void userInfoUpdate(UserInfoModifyRequest request, Integer userId) {
        User user = userRepository.findByIdAndIsDeletedFalse(userId).orElseThrow(UserNotFoundException::new);
        user.update(request);
    }
}
