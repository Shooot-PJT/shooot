package com.shooot.application.project.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project")
@Entity
public class Project extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "logo_image")
    private String logoImageUrl;

    @Column(name = "memo")
    private String memo;

}