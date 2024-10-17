package com.shooot.application.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Optional<User> findByIdAndIsDeletedFalse(Integer id);
}
