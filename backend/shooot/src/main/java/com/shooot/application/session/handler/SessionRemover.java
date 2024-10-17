package com.shooot.application.session.handler;

import com.shooot.application.session.SessionAttributeProvider;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class SessionRemover {
    private final HttpSession httpSession;

    public void removeAll() {
        httpSession.invalidate();
    }

    public void remove(SessionAttributeProvider provider) {
        httpSession.removeAttribute(provider.getAttribute().getName());
    }
}
