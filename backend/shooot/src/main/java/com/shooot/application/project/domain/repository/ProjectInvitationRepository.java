package com.shooot.application.project.domain.repository;

import com.shooot.application.project.domain.ProjectInvitation;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;

public interface ProjectInvitationRepository extends CrudRepository<ProjectInvitation, UUID> {

}
