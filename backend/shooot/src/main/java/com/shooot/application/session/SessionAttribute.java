package com.shooot.application.session;

public interface SessionAttribute<T> {
    String getName();
    Class<T> getType();
}
