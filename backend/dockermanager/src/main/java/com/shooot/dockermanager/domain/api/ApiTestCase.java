package com.shooot.dockermanager.domain.api;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class ApiTestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_test_case_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @Column(name = "test_title")
    private String title;

    @Column(name = "http_status_code")
    private HttpStatus httpStatus;

    @Column(name = "description")
    private String description;

}
