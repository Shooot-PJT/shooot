package com.shooot.application.session;

public interface SessionAttributeProvider {
    public <T> SessionAttribute<T> getAttribute();
}
