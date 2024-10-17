package com.shooot.application.common.domain.password;


import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Password {
    private String value;

    @Transient
    private boolean isEncoded;

    private Password(String password, boolean isEncoded) {
        this.value = password;
        this.isEncoded = isEncoded;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Password password1 = (Password) o;
        return PasswordMatcher.matches(this, password1);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    public static Password of(String value, boolean encoded) {
        return new Password(value, encoded);
    }
}
