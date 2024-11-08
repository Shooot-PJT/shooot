package com.shooot.application.api.domain;

import com.shooot.application.api.service.query.test.dto.ApiTestLogInfiniteResponse;
import com.shooot.application.common.jpa.SoftDeleteEntity;
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
public class ApiTestLog extends SoftDeleteEntity {
    @Id
    @GeneratedValue
    @Column(name = "api_test_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_participant_id")
    private ProjectParticipant projectParticipant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_test_case_id")
    private ApiTestCase apiTestCase;

    @Column(name = "is_success")
    private Boolean isSuccess;

    @Column(name = "http_status")
    private HttpStatus httpStatus;

    @Column(name = "http_body")
    @Lob
    private String httpBody;

    @Column(name = "http_header")
    @Lob
    private String httpHeader;

    public static ApiTestLogInfiniteResponse from(ApiTestLog apiTestLog){
        return ApiTestLogInfiniteResponse.builder()
                .id(apiTestLog.getId())
                .projectId(apiTestLog.getProjectParticipant().getId())
                .tester(apiTestLog.getProjectParticipant().getUser().getNickname())
                .testCaseId(apiTestLog.getApiTestCase().getId())
                .isSuccess(apiTestLog.getIsSuccess())
                .httpStatus(apiTestLog.getHttpStatus())
                .httpBody(apiTestLog.getHttpBody())
                .httpHeader(apiTestLog.getHttpHeader())
                .build();
    }
}
