package com.shooot.application.project.domain;

import com.shooot.application.common.infra.storage.domain.File;
import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.projecttest.domain.ProjectBuild;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project")
@Entity
@SQLRestriction("is_deleted = false")
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

    @OneToMany(mappedBy = "project")
    private List<ProjectBuild> projectBuilds = new ArrayList<>();

    public void changeName(String name) {
        this.name = name;
    }

    public void changeLogoImageFile(File logoImageFile) {
        this.logoImageFile = logoImageFile;
    }

    public void changeMemo(String memo) {
        this.memo = memo;
    }

    public boolean isDeploy() {
        for (ProjectBuild projectBuild : projectBuilds) {
            if (projectBuild.getProjectBuildLog().isDeploy()) {
                return true;
            }
        }
        return false;
    }
}
