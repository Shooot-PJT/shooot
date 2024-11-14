package com.shooot.dockermanager.domain.api;

import com.shooot.dockermanager.jpa.SoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api")
@Entity
public class Api extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    private Integer id;

    @Column(name = "api_title")
    private String title;

    @Column(name = "api_description")
    private String description;

    @Column(name = "method")
    private String method;

    @Column(name = "url")
    private String url;

    @LastModifiedDate
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "is_real_server")
    private Boolean isRealServer;

    @Column(name = "is_secure")
    private Boolean isSecure;

    @Enumerated(EnumType.STRING)
    @Column(name = "test_status")
    private ApiTestStatusType testStatus;


    @Override
    protected void prePersistAction() {
        if (isRealServer == null) {
            this.isRealServer = false;
        }

        if (isSecure == null) {
            this.isSecure = false;
        }
    }

}
