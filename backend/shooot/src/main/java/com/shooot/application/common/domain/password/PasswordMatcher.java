package com.shooot.application.common.domain.password;

import org.springframework.security.crypto.password.PasswordEncoder;

final class PasswordMatcher {
    private static PasswordEncoder encoder;

    private PasswordMatcher() {}

    static void setPasswordEncoder(PasswordEncoder encoder) {
        PasswordMatcher.encoder = encoder;
    }

     static boolean matches(Password p1, Password p2) {
        if(p1.isEncoded() && p2.isEncoded()) {
            return p1.getValue().equals(p2.getValue());
        }else {
            if(p1.isEncoded()) {
                return encoder.matches(p2.getValue(), p1.getValue());
            }else {
                return encoder.matches(p1.getValue(), p2.getValue());
            }
        }
    }

}
