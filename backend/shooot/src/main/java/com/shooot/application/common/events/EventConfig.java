package com.shooot.application.common.events;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@AllArgsConstructor
@Configuration
public class EventConfig {

    @Bean
    public InitializingBean setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        return () -> Events.setApplicationEventPublisher(applicationEventPublisher);
    }
}
