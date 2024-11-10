package com.shooot.application.api.domain;

import com.shooot.application.api.service.command.domain.dto.DomainModifyRequest;
import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.project.domain.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "domain")
@Entity
public class Domain extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_domain_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "domain_name")
    private String name;

    @Column(name = "domain_description")
    private String description;

    @LastModifiedDate
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "domain", cascade = CascadeType.ALL)
    private List<Api> apis;

    public void update(DomainModifyRequest modifyRequest){
        if(modifyRequest.getTitle() != null){
            this.name = modifyRequest.getTitle();
        }

        if(modifyRequest.getDescription() != null){
            this.description = modifyRequest.getDescription();
        }
    }
}
