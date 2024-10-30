package com.shooot.application.projecttest.controller;

import com.shooot.application.projecttest.controller.dto.ProjectApiDocsForTestView;
import com.shooot.application.projecttest.controller.dto.ProjectBuildView;
import com.shooot.application.projecttest.controller.dto.ProjectJarFileUploadView;
import com.shooot.application.projecttest.service.command.ProjectApiDocsSettingService;
import com.shooot.application.projecttest.service.command.ProjectBuildUploadService;
import com.shooot.application.projecttest.service.command.ProjectTestRunService;
import com.shooot.application.projecttest.service.dto.ProjectBuildTestRunRequest;
import com.shooot.application.projecttest.service.dto.ProjectIdDto;
import com.shooot.application.projecttest.service.query.ProjectBuildFindService;
import com.shooot.application.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/projects")
@RestController
public class ProjectBuildController {
    private final ProjectBuildFindService projectBuildFindService;
    private final ProjectBuildUploadService projectBuildUploadService;
    private final ProjectApiDocsSettingService projectApiDocsSettingService;
    private final ProjectTestRunService projectTestRunService;

    @PostMapping("/jarFile")
    public ResponseEntity<ProjectJarFileUploadView> jarFileUpload(ProjectIdDto projectIdDto, @RequestParam MultipartFile jarFile, @RequestParam MultipartFile dockerComposeFile, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        Integer id = projectBuildUploadService.buildFileApiExtractor(projectIdDto.getProjectId(), jarFile, dockerComposeFile);
        ProjectJarFileUploadView projectJarFileUploadView = new ProjectJarFileUploadView(id);
        return ResponseEntity.ok(projectJarFileUploadView);
    }

    @GetMapping("/{projectId}/jarFile")
    public ResponseEntity<List<ProjectBuildView>> jarFileList(@PathVariable("projectId") Integer projectId) {
        List<ProjectBuildView> allByProjectId = projectBuildFindService.findAllByProjectId(projectId);
        return ResponseEntity.ok(allByProjectId);
    }

    @PatchMapping("/jarFile/{projectJarFileId}/end-point")
    public ResponseEntity<ProjectApiDocsForTestView> apiAndJarApiCompare(@PathVariable(name = "projectJarFileId") Integer projectJarFileId) {
        ProjectApiDocsForTestView view = projectApiDocsSettingService.forTestInfo(projectJarFileId);
        return ResponseEntity.ok(view);
    }

    @PatchMapping("/jarFile/test/run")
    public ResponseEntity<Void> testRun(@RequestBody ProjectBuildTestRunRequest projectBuildTestRunRequest, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        projectTestRunService.testRunRequest(projectBuildTestRunRequest);
        return ResponseEntity.ok().build();
    }

}
