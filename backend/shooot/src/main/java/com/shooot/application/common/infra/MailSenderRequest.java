package com.shooot.application.common.infra;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MailSenderRequest {
    private String toEmail;
    private String templatePath;
    private Map<String, String> variables;
    private String subject;
}

