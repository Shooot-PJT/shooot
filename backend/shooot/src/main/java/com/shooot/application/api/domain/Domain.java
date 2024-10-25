package com.shooot.application.api.domain;

import com.shooot.application.project.domain.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "domain")
@Entity
public class Domain {
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "domain", cascade = CascadeType.ALL)
    private List<Api> apis;
}
