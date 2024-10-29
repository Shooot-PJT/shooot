package com.shooot.application.project.ui;

import com.shooot.application.project.service.command.ProjectAcceptInvitationService;
import com.shooot.application.project.service.command.ProjectDeleteParticipantService;
import com.shooot.application.project.service.command.ProjectInviteService;
import com.shooot.application.project.service.command.ProjectModifyService;
import com.shooot.application.project.service.command.ProjectRegisterService;
import com.shooot.application.project.service.dto.ProjectInviteRequest;
import com.shooot.application.project.service.dto.ProjectModifyRequest;
import com.shooot.application.project.service.dto.ProjectRegisterRequest;
import com.shooot.application.project.service.query.FindParticipantsService;
import com.shooot.application.project.service.query.GetLogoService;
import com.shooot.application.project.service.query.ProjectFindService;
import com.shooot.application.project.ui.dto.FindParticipantsResponse;
import com.shooot.application.project.ui.dto.ProjectView;
import com.shooot.application.security.service.UserLoginContext;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/projects")
@RestController
public class ProjectController {

    private final ProjectRegisterService projectRegisterService;
    private final ProjectModifyService projectModifyService;
    private final ProjectFindService projectFindService;
    private final ProjectInviteService projectInviteService;
    private final ProjectAcceptInvitationService projectAcceptInvitationService;
    private final FindParticipantsService findParticipantsService;
    private final ProjectDeleteParticipantService projectDeleteParticipantService;
    private final GetLogoService getLogoService;

    @PostMapping
    public ResponseEntity<Void> projectRegister(
        @RequestPart ProjectRegisterRequest request,
        @RequestPart MultipartFile file,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ) {
        Integer userId = 1;
        projectRegisterService.projectRegister(request, file, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Void> projectModify(
        @RequestPart ProjectModifyRequest request,
        @RequestPart(required = false) MultipartFile file,
        @PathVariable Integer projectId,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ) {
        Integer userId = userLoginContext.getUserId();
        if (Objects.isNull(file)) {
            projectModifyService.projectModify(request, projectId, userId);
        } else {
            projectModifyService.projectModify(request, file, projectId, userId);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectView> findById(
        @PathVariable(name = "projectId") Integer projectId) {
        ProjectView byProjectId = projectFindService.findByProjectId(projectId);
        return ResponseEntity.ok().body(byProjectId);
    }

    @PostMapping("/{projectId}/invite")
    public ResponseEntity<Void> invite(
        @PathVariable(name = "projectId") Integer projectId,
        @RequestBody ProjectInviteRequest request
    ) {
        projectInviteService.invite(projectId, request.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/logo")
    public ResponseEntity<?> getLogo(
        @PathVariable(name = "projectId") Integer projectId
    ) {
        return getLogoService.getLogo(projectId);
    }

    @GetMapping("/invitations/{projectInvitationId}")
    public ResponseEntity<Void> acceptInvitation(
        @PathVariable(name = "projectInvitationId") UUID projectInvitationId
    ) {
        projectAcceptInvitationService.acceptInvitation(projectInvitationId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/participants")
    public ResponseEntity<List<FindParticipantsResponse>> findParticipants(
        @PathVariable(name = "projectId") Integer projectId
    ) {
        return ResponseEntity.ok(findParticipantsService.findParticipants(projectId));
    }

    @DeleteMapping("/{projectId}/users/{userId}")
    public ResponseEntity<Void> deleteUser(
        @PathVariable(name = "projectId") Integer projectId,
        @PathVariable(name = "userId") Integer userId
    ) {
        projectDeleteParticipantService.deleteParticipant(projectId, userId);
        return ResponseEntity.ok().build();
    }
}
