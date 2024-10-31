package com.shooot.dockermanager.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class SoftDeleteEntity extends BaseEntity {

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @PrePersist
    protected void setDefault() {
        if(isDeleted == null) {
            this.isDeleted = false;
        }
        prePersistAction();
    }


    protected void prePersistAction() {

    }

    public void delete() {
        this.isDeleted = true;
    }

    public void recovery() {
        this.isDeleted = false;
    }
}
