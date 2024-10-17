package com.shooot.application.session.handler;

import com.shooot.application.session.SessionAttribute;
import com.shooot.application.session.SessionAttributeProvider;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Component
public class SessionFinder {
    private final HttpSession session;


    // 인터페이스를 통해 객체를 가져오는 메서드
    public <T> Optional<T> getAttribute(SessionAttributeProvider wrapper) {
        SessionAttribute<?> attribute = wrapper.getAttribute();
        Object value = session.getAttribute(attribute.getName());
        if (value == null) {
            return Optional.empty();
        }
        attribute.getType();
        if (attribute.getType().isInstance(value)) {
            return (Optional<T>) Optional.of(attribute.getType().cast(value));
        } else {
            throw new IllegalArgumentException("Session attribute " + attribute.getName() + " is not of type " + attribute.getType().getName());
        }
    }

}
