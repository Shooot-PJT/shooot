package com.shooot.application.project.ui;

import com.shooot.application.project.service.command.ProjectModifyService;
import com.shooot.application.project.service.command.ProjectRegisterService;
import com.shooot.application.project.service.dto.ProjectModifyRequest;
import com.shooot.application.project.service.dto.ProjectRegisterRequest;
import com.shooot.application.project.service.query.ProjectFindService;
import com.shooot.application.project.ui.dto.ProjectView;
import com.shooot.application.security.service.UserLoginContext;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/project")
@RestController
public class ProjectController {

    private final ProjectRegisterService projectRegisterService;
    private final ProjectModifyService projectModifyService;
    private final ProjectFindService projectFindService;

    // TODO: 현재 접속 중인 유저 정보 가져와 함께 전달하도록 수정
    @PostMapping
    public ResponseEntity<Void> projectRegister(
        @RequestPart ProjectRegisterRequest request,
        @RequestPart MultipartFile file,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ) {
        Integer userId = userLoginContext.getUserId();
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
    public ResponseEntity<ProjectView> findById(@PathVariable Integer projectId) {
        ProjectView byProjectId = projectFindService.findByProjectId(projectId);
        return ResponseEntity.ok().body(byProjectId);
    }
}
