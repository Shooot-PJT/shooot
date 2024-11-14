package com.shooot.application.security.service;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;

@Getter
@ToString
public class UserLoginContext extends User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1123091893903829L;
    private final Integer userId;


    public UserLoginContext( Collection<? extends GrantedAuthority> authorities, com.shooot.application.user.domain.User user) {
        super(user.getUsername(), user.getPassword().getValue(), authorities);
        this.userId = user.getId();
    }

}
