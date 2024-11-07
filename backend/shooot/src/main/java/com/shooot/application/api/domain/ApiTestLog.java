package com.shooot.application.api.domain;

import com.shooot.application.common.jpa.uuid.UUIDv7;
import com.shooot.application.project.domain.ProjectParticipant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_test_log")
@Entity
public class ApiTestLog {
    @Id
    @GeneratedValue
    @Column(name = "api_test_log")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_participant_id")
    private ProjectParticipant projectParticipant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_test_case_id")
    private ApiTestCase apiTestCase;

    @Column(name = "http_status")
    private HttpStatus httpStatus;

    @Column(name = "http_body")
    @Lob
    private String httpBody;

    @Column(name = "http_header")
    @Lob
    private String httpHeader;
}