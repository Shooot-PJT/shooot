package com.shooot.application.user.domain;

import com.shooot.application.common.domain.password.Password;
import com.shooot.application.common.domain.password.PasswordConverter;
import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.user.service.dto.SignupRequest;
import com.shooot.application.user.service.dto.UserInfoModifyRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.EnumSet;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "user")
@Entity
public class User extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @Column(name = "email")
    private String username;

    @Convert(converter = PasswordConverter.class)
    @Column(name = "password")
    private Password password;

    @Column(name = "nickname")
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    private ProfileColor color;


    public static User create(SignupRequest request) {
        ProfileColor[] profileColors = ProfileColor.values();

        return User.builder()
                .nickname(request.getNickname())
                .password(Password.of(request.getPassword(), false))
                .username(request.getEmail())
                .color(profileColors[request.getNickname().hashCode() % profileColors.length])
                .build();
    }


    public void update(UserInfoModifyRequest request) {
        if(request.getNickname() != null && !request.getNickname().isEmpty())
            this.nickname = request.getNickname();
    }

}
