package com.shooot.application.project.domain;

import com.shooot.application.common.infra.storage.domain.File;
import com.shooot.application.common.jpa.SoftDeleteEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

    @Column(name = "english_name")
    private String englishName;

    @Column(name = "memo")
    private String memo;

    @Embedded
    private File logoImageFile;

    public void changeName(String name) {
        this.name = name;
    }

    public void changeLogoImageFile(File logoImageFile) {
        this.logoImageFile = logoImageFile;
    }

    public void changeMemo(String memo) {
        this.memo = memo;
    }
}
