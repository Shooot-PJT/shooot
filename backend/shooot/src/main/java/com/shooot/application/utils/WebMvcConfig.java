package com.shooot.application.utils;

import com.shooot.application.api.domain.interceptor.ParticipantCheckInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final ParticipantCheckInterceptor participantCheckInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(participantCheckInterceptor)
                .addPathPatterns("/projects/**"); // 특정 경로에만 적용하거나 모든 경로에 적용 가능
    }

}
