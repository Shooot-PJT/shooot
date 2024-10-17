package com.shooot.application.common.infra;


import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Async("mailExecutor")
@RequiredArgsConstructor
@Slf4j
@Component
class MailSenderRequestHandler {

    private final JavaMailSender javaMailSender;

    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}") private String username;

    @EventListener
    public void sendEmail(MailSenderRequest request) {
        try {
            MimeMessage emailForm = createEmailForm(request);
            javaMailSender.send(emailForm);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private MimeMessage createEmailForm(MailSenderRequest request) throws MessagingException {
        //인증 토큰 생성

        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, request.getToEmail());
        message.setSubject(request.getSubject());
        message.setFrom(username + "@naver.com");
        message.setText(setContext(request.getTemplatePath(), request.getVariables()), "utf-8", "html");

        return message;
    }


    private String setContext(String templatePath, Map<String, String> variables) {
        Context context = new Context();
        for (Map.Entry<String, String> variable : variables.entrySet()) {
            context.setVariable(variable.getKey(), variable.getValue());
        }
        return templateEngine.process(templatePath, context);
    }


}
