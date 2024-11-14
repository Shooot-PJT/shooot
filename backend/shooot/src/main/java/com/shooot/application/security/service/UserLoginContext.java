package com.shooot.application.security.service;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;

@Getter
@ToString
public class UserLoginContext extends User implements Serializable {

    private final Integer userId;


    public UserLoginContext( Collection<? extends GrantedAuthority> authorities, com.shooot.application.user.domain.User user) {
        super(user.getUsername(), user.getPassword().getValue(), authorities);
        this.userId = user.getId();
    }

}
