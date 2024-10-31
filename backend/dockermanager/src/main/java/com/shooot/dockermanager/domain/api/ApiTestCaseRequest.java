package com.shooot.dockermanager.domain.api;


import com.shooot.dockermanager.jpa.map.MapToJsonConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;


@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_test_case_request")
@Entity
public class ApiTestCaseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_test_request_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_test_case_id")
    private ApiTestCase apiTestCase;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ApiTestCaseType type;

    @Convert(converter = MapToJsonConverter.class)
    @Column(name = "content")
    private Map<String, Object> content;
}
