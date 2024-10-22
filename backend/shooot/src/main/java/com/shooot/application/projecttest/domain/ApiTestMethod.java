package com.shooot.application.projecttest.domain;

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
    @JoinColumn(name = "build_file_api_docs_id")
    private BuildFileApiDocs buildFileApiDocs;

    @Enumerated(EnumType.STRING)
    @Column(name = "method_type")
    private BuildFileTestMethod buildFileTestMethod;

    @Column(name = "virtual_users_num")
    private Integer vUsers;

    @Column(name = "test_duration")
    private Integer testDuration;

}
