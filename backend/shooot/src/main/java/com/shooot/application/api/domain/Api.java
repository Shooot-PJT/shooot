package com.shooot.application.api.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.service.command.api.dto.ApiModifyRequest;
import com.shooot.application.api.service.command.api.dto.ApiToggleModifyRequest;
import com.shooot.application.common.jpa.BaseEntity;
import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.common.jpa.map.MapToJsonConverter;
import com.shooot.application.project.domain.ProjectParticipant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.EntityGraph;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api")
@Entity
@ToString
public class Api extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_domain_id")
    private Domain domain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_manager_id")
    private ProjectParticipant projectParticipant;

    @Column(name = "api_title")
    private String title;

    @Column(name = "api_description")
    private String description;

    @Column(name = "method")
    private String method;

    @Column(name = "url")
    private String url;

    @Column(name = "example_url")
    private String exampleUrl;

    @Convert(converter = MapToJsonConverter.class)
    @Column(name = "example_content")
    private Map<String, Object> exampleContent;

    @LastModifiedDate
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "is_real_server")
    private Boolean isRealServer;

    @Column(name = "is_secure")
    private Boolean isSecure;

    @Enumerated(EnumType.STRING)
    @Column(name ="test_status")
    private ApiTestStatusType testStatus;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "api")
    private List<ApiSubscribe> subscribers = new ArrayList<>();

    @Override
    protected void prePersistAction() {
        if(isRealServer == null){
            this.isRealServer = false;
        }

        if(isSecure == null){
            this.isSecure = false;
        }

        if(testStatus == null){
            this.testStatus = ApiTestStatusType.YET;
        }
    }

    public void update(ApiModifyRequest apiModifyRequest){
        if(apiModifyRequest.getTitle() != null){
            this.title = apiModifyRequest.getTitle();
        }

        if(apiModifyRequest.getDescription() != null){
            this.description = apiModifyRequest.getDescription();
        }

        if(apiModifyRequest.getUrl() != null){
            this.url = apiModifyRequest.getUrl();
        }

        if(apiModifyRequest.getExampleUrl() != null){
            this.exampleUrl = apiModifyRequest.getExampleUrl();
        }

        if(apiModifyRequest.getExampleContent() != null){
            ObjectMapper objectMapper = new ObjectMapper();
            this.exampleContent = objectMapper.convertValue(apiModifyRequest.getExampleContent(), Map.class);
        }

        if(apiModifyRequest.getMethod() != null){
            this.method = apiModifyRequest.getMethod();
        }

        if(apiModifyRequest.getIsSecure() != null){
            this.isSecure = apiModifyRequest.getIsSecure();
        }

    }

    public void update(ApiToggleModifyRequest apiToggleModifyRequest){
        if(apiToggleModifyRequest.getIsRealServer() != null){
            this.isRealServer = apiToggleModifyRequest.getIsRealServer();
        }

        if(apiToggleModifyRequest.getIsSecure() != null){
            this.isSecure = apiToggleModifyRequest.getIsSecure();
        }
    }

    public void testCaseUpdate(){
        this.modifiedAt = LocalDateTime.now();
    }

}
