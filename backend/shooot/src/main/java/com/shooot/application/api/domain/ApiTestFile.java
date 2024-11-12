package com.shooot.application.api.domain;

import com.shooot.application.common.jpa.uuid.UUIDv7;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_test_file")
@Entity
@Builder
public class ApiTestFile {
    @Id
    @GeneratedValue
    @Column(name = "api_file_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_test_case_id")
    private ApiTestCase testCaseId;

    @Column(name = "file_path")
    private String location;

    @Column(name = "file_extension")
    private String extension;

    @Column(name = "file_original_name")
    private String originalName;

    @Column(name = "file_size")
    private Integer size;
}
