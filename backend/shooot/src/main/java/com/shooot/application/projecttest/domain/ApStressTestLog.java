package com.shooot.application.projecttest.domain;

import com.shooot.application.common.jpa.map.MapToJsonConverter;
import com.shooot.application.common.jpa.uuid.UUIDv7;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class ApStressTestLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_stress_test_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "build_file_api_docs_id")
    private BuildFileApiDocs buildFileApiDocs;

    @Convert(converter = MapToJsonConverter.class)
    @Column(name = "response_body")
    private Map<String, Object> responseBody;


    @Convert(converter = MapToJsonConverter.class)
    @Column(name = "request_content")
    private Map<String, Object> requestContent;

    @Column(name = "url")
    private String url;
}
