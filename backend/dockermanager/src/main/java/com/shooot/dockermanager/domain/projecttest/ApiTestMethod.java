package com.shooot.dockermanager.domain.projecttest;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_test_method")
@Entity
public class ApiTestMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_test_method_id")
    private Integer id;

    @Column(name = "api_id")
    private Integer apiId;

    @Enumerated(EnumType.STRING)
    @Column(name = "method_type")
    private BuildFileTestMethod buildFileTestMethod;

    @Column(name = "virtual_users_num")
    private Integer vUsers;

    @Column(name = "test_duration")
    private Integer testDuration;

}
