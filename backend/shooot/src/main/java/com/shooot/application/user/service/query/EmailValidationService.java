package com.shooot.application.user.service.query;

import com.shooot.application.common.events.Events;
import com.shooot.application.common.infra.MailSenderRequest;
import com.shooot.application.user.exception.EmailVerificationNotFoundException;
import com.shooot.application.user.ui.dto.EmailIsValidView;
import com.shooot.application.user.exception.EmailVerificationRequestNotFoundException;
import com.shooot.application.user.exception.UserExistException;
import com.shooot.application.user.service.dto.EmailVerificationNumberRequest;
import com.shooot.application.user.service.dto.EmailVerificationRequest;
import com.shooot.application.user.session.UserSessionConstants;
import com.shooot.application.user.session.UserVerificationEmailDto;
import com.shooot.application.session.handler.SessionAdder;
import com.shooot.application.session.handler.SessionFinder;
import com.shooot.application.session.handler.SessionRemover;
import com.shooot.application.utils.GenerateRandomNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmailValidationService {
    private final SessionFinder sessionFinder;
    private final SessionAdder sessionAdder;
    private final SessionRemover sessionRemover;
    private final UserFindService userFindService;

    @Transactional(readOnly = true)
    public void emailVerificationRequest(EmailVerificationNumberRequest emailVerificationNumberRequest) {
        if(!userFindService.existByUsername(emailVerificationNumberRequest.getEmail()).getIsValid()) {
            throw new UserExistException();
        }
        emailNumberRequest(emailVerificationNumberRequest);
    }

    @Transactional(readOnly = true)
    public EmailIsValidView emailVerify(EmailVerificationRequest request) {
        return EmailIsValidView.builder().isValid(verifyEmail(request)).build();
    }

    public void emailCanUseValidCheck() {
        Optional<UserVerificationEmailDto> attribute = sessionFinder.getAttribute(UserSessionConstants.USER_VERIFICATION_EMAIL);
        if(attribute.isEmpty()) {
            throw new EmailVerificationRequestNotFoundException();
        }

        UserVerificationEmailDto dto = attribute.get();
        if(dto.getIsValid() == null || !dto.getIsValid()) {
            throw new EmailVerificationNotFoundException();
        }

    }

    public void emailValidCheckRemove() {
        sessionRemover.remove(UserSessionConstants.USER_VERIFICATION_EMAIL);
    }

    private void emailNumberRequest(EmailVerificationNumberRequest request) {
        String randomNumStr = GenerateRandomNumber.getStr(6);

        UserVerificationEmailDto userVerificationEmailDto = UserVerificationEmailDto.builder()
                .email(request.getEmail())
                .verificationNumber(randomNumStr)
                .build();

        sessionAdder.setAttribute(UserSessionConstants.USER_VERIFICATION_EMAIL, userVerificationEmailDto);

        Events.raise(MailSenderRequest.builder()
                .toEmail(request.getEmail())
                .subject("[Shooot]이메일 인증 코드 발송 안내입니다.")
                .variables(Map.of("verificationNumber", randomNumStr))
                .templatePath("email-verification-number-template")
                .build()
        );
    }

    private boolean verifyEmail(EmailVerificationRequest dto) {
        Optional<UserVerificationEmailDto> attribute = sessionFinder.getAttribute(UserSessionConstants.USER_VERIFICATION_EMAIL);

        if(attribute.isEmpty()) {
            throw new EmailVerificationRequestNotFoundException();
        }

        if(attribute.get().verify(dto)) {
            sessionAdder.setAttribute(UserSessionConstants.USER_VERIFICATION_EMAIL, attribute.get());
            return true;
        }
        return false;
    }
}
