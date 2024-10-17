package com.shooot.application.session;

// 세션 속성을 정의하는 구체 클래스
public class SessionConstant<T> implements SessionAttribute<T> {
    private final String name;
    private final Class<T> type;

    public SessionConstant(String name, Class<T> type) {
        this.name = name;
        this.type = type;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Class<T> getType() {
        return type;
    }
}
