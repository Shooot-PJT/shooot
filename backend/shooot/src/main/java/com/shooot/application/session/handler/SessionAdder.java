package com.shooot.application.session.handler;

import com.shooot.application.session.SessionAttribute;
import com.shooot.application.session.SessionAttributeProvider;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class SessionAdder {
    private final HttpSession session;


    // 인터페이스를 통해 객체를 저장하는 메서드
    public <T> void setAttribute(SessionAttributeProvider attribute, T value) {
        session.setAttribute(attribute.getAttribute().getName(), value);
    }
}
