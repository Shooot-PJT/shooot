package com.shooot.application.user.session;

import com.shooot.application.session.SessionAttributeProvider;
import com.shooot.application.session.SessionConstant;

public enum UserSessionConstants implements SessionAttributeProvider {
    USER_VERIFICATION_EMAIL("USER_VERIFICATION_EMAIL", UserVerificationEmailDto.class);

    private final SessionConstant<?> attribute;

    // 열거형 생성자
    <T> UserSessionConstants(String name, Class<T> type) {
        this.attribute = new SessionConstant<>(name, type);
    }

    // 각 상수마다 고유한 SessionConstant 반환
    @SuppressWarnings("unchecked")
    public <T> SessionConstant<T> getAttribute() {
        return (SessionConstant<T>) this.attribute;
    }

}
