package com.shooot.application.api.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
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
public class ApiTestCase extends SoftDeleteEntity {
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

    @Enumerated(EnumType.STRING)
    @Column(name = "test_case_status")
    private ApiTestStatusType testCaseStatus;

    @PrePersist
    public void setDefault(){
        if(testCaseStatus == null){
            this.testCaseStatus = ApiTestStatusType.YET;
        }
    }

}
