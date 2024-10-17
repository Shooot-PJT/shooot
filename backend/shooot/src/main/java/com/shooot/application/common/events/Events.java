package com.shooot.application.common.events;


import org.springframework.context.ApplicationEventPublisher;

public final class Events {
    private static ApplicationEventPublisher applicationEventPublisher;

    public static void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        if(Events.applicationEventPublisher == null) {
            Events.applicationEventPublisher = applicationEventPublisher;
        }else {
            throw new IllegalCallerException();
        }

    }

    public static void raise(Object o) {
        if(o != null) {
            applicationEventPublisher.publishEvent(o);
        }
    }
}
