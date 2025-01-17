package com.shooot.application.project.ui;

import com.shooot.application.project.exception.ProjectEnglishNameNotValidException;
import com.shooot.application.project.exception.ProjectNameNotValidException;
import com.shooot.application.project.service.command.ProjectAcceptInvitationService;
import com.shooot.application.project.service.command.ProjectDeleteParticipantService;
import com.shooot.application.project.service.command.ProjectInviteService;
import com.shooot.application.project.service.command.ProjectModifyService;
import com.shooot.application.project.service.command.ProjectRegisterService;
import com.shooot.application.project.service.command.ProjectRemoveService;
import com.shooot.application.project.service.dto.ProjectInviteRequest;
import com.shooot.application.project.service.dto.ProjectModifyRequest;
import com.shooot.application.project.service.dto.ProjectRegisterRequest;
import com.shooot.application.project.service.query.FindParticipantsService;
import com.shooot.application.project.service.query.GetAllProjectsService;
import com.shooot.application.project.service.query.GetLogoService;
import com.shooot.application.project.service.query.GetProjectService;
import com.shooot.application.project.ui.dto.FindParticipantsResponse;
import com.shooot.application.project.ui.dto.ModifyProjectResponse;
import com.shooot.application.project.ui.dto.ProjectResponse;
import com.shooot.application.project.ui.dto.RegisterProjectResponse;
import com.shooot.application.security.service.UserLoginContext;
import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    private final ProjectInviteService projectInviteService;
    private final ProjectAcceptInvitationService projectAcceptInvitationService;
    private final FindParticipantsService findParticipantsService;
    private final ProjectDeleteParticipantService projectDeleteParticipantService;
    private final GetLogoService getLogoService;
    private final GetAllProjectsService getAllProjectsService;
    private final GetProjectService getProjectService;
    private final ProjectRemoveService projectRemoveService;

    @Value("${url.project.base}")
    private String baseUrl;

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects(
        @AuthenticationPrincipal UserLoginContext context
    ) {
        Integer userId = context.getUserId();
        return ResponseEntity.ok(getAllProjectsService.getAllProjects(userId));
    }

    @PostMapping
    public ResponseEntity<RegisterProjectResponse> projectRegister(
        @RequestPart ProjectRegisterRequest request,
        @RequestPart(required = false) MultipartFile file,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ) {
        if (Objects.isNull(request.getName())) {
            throw new ProjectNameNotValidException();
        }

        if (
            Objects.isNull(request.getEnglishName()) ||
                request.getEnglishName().isEmpty() ||
                request.getEnglishName().length() > 20
        ) {
            throw new ProjectEnglishNameNotValidException();
        }

        Integer userId = userLoginContext.getUserId();
        return ResponseEntity.ok(projectRegisterService.projectRegister(request, file, userId));
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ModifyProjectResponse> projectModify(
        @RequestPart ProjectModifyRequest request,
        @RequestPart(required = false) MultipartFile file,
        @PathVariable Integer projectId,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ) {
        if (Objects.isNull(request.getName())) {
            throw new ProjectNameNotValidException();
        }

        Integer userId = userLoginContext.getUserId();
        if (Objects.isNull(file)) {
            projectModifyService.projectModify(request, projectId, userId);
        } else {
            projectModifyService.projectModify(request, file, projectId, userId);
        }

        return ResponseEntity.ok(
            ModifyProjectResponse.builder()
                .projectId(projectId)
                .build()
        );
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProject(
        @PathVariable(name = "projectId") Integer projectId,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ) {
        Integer userId = userLoginContext.getUserId();
        return ResponseEntity.ok(getProjectService.getProject(projectId, userId));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> removeProject(
        @AuthenticationPrincipal UserLoginContext userLoginContext,
        @PathVariable(name = "projectId") Integer projectId
    ) {
        Integer userId = userLoginContext.getUserId();
        projectRemoveService.projectRemove(userId, projectId);
        return ResponseEntity.ok().build();
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
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(baseUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
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

    @GetMapping("/{projectId}/participant-id")
    public ResponseEntity<?> getProjectParticipantId(
        @PathVariable(name = "projectId") Integer projectId,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        return ResponseEntity.ok(findParticipantsService.findParticipantId(projectId, userId));
    }

    @GetMapping("/{projectId}/participant-list")
    public ResponseEntity<?> getProjectParticipantList(
        @PathVariable(name = "projectId") Integer projectId
    ){
        return ResponseEntity.ok(findParticipantsService.findParticipantList(projectId));
    }

}
