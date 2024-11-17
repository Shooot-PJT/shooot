package com.shooot.application.projecttest.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProjectVersion {

    @Column(name = "version_major")
    private Integer major;

    @Column(name = "version_minor")
    private Integer minor;

    @Column(name = "version_patch")
    private Integer patch;

    @Setter
    @Column(name = "version_temporary")
    private Integer temporary;

    public boolean equals(Object o) {
        if (o == null) {
            return false;
        }
        if (o.getClass() != ProjectVersion.class) {
            return false;
        }
        ProjectVersion version = (ProjectVersion) o;
        return Objects.equals(this.major, version.major)
            && Objects.equals(this.major, version.minor)
            && Objects.equals(this.patch, version.patch)
            && Objects.equals(this.temporary, version.temporary);
    }

    public String getVersion() {
        return major + "." + minor + "." + patch + (temporary == 0 ? "" : "-" + temporary);
    }
}
