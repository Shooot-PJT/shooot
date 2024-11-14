package com.shooot.application.projecttest.domain;

import com.shooot.application.api.domain.Api;
import com.shooot.application.projecttest.service.dto.ApiTestMethodRequest;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private BuildFileTestMethod buildFileTestMethod;

    @Column(name = "virtual_users_num")
    private Integer vUsers;

    @Column(name = "test_duration")
    private Integer testDuration;


    public void update(ApiTestMethodRequest apiTestMethodRequest) {
        this.buildFileTestMethod = BuildFileTestMethod.valueOf(apiTestMethodRequest.getMethod());
        this.vUsers = apiTestMethodRequest.getVuserNum();
        this.testDuration = apiTestMethodRequest.getDuration();
    }
}
