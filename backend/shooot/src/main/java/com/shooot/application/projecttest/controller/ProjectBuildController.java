package com.shooot.application.projecttest.controller;

import com.shooot.application.projecttest.controller.dto.ProjectApiDocsForTestView;
import com.shooot.application.projecttest.controller.dto.ProjectBuildView;
import com.shooot.application.projecttest.controller.dto.ProjectJarFileUploadView;
import com.shooot.application.projecttest.service.command.ProjectApiDocsSettingService;
import com.shooot.application.projecttest.service.command.ProjectBuildRemoveService;
import com.shooot.application.projecttest.service.command.ProjectBuildUploadService;
import com.shooot.application.projecttest.service.command.ProjectDeployService;
import com.shooot.application.projecttest.service.command.ProjectTestRunService;
import com.shooot.application.projecttest.service.command.ProjectTestStopService;
import com.shooot.application.projecttest.service.dto.ProjectBuildIdDto;
import com.shooot.application.projecttest.service.dto.ProjectBuildTestRunRequest;
import com.shooot.application.projecttest.service.dto.ProjectBuildTestStopRequest;
import com.shooot.application.projecttest.service.dto.ProjectIdDto;
import com.shooot.application.projecttest.service.query.ProjectBuildFindService;
import com.shooot.application.security.service.UserLoginContext;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
public class ProjectBuildController {

    private final ProjectBuildFindService projectBuildFindService;
    private final ProjectBuildUploadService projectBuildUploadService;
    private final ProjectApiDocsSettingService projectApiDocsSettingService;
    private final ProjectTestRunService projectTestRunService;
    private final ProjectDeployService projectDeployService;
    private final ProjectBuildRemoveService projectBuildRemoveService;
    private final ProjectTestStopService projectTestStopService;

    @PostMapping("/jarFile")
    public ResponseEntity<ProjectJarFileUploadView> jarFileUpload(
        @RequestPart ProjectIdDto projectIdDto, @RequestPart MultipartFile jarFile,
        @RequestPart MultipartFile dockerComposeFile,
        @AuthenticationPrincipal UserLoginContext userLoginContext) {
        Integer id = projectBuildUploadService.buildFileApiExtractor(projectIdDto.getProjectId(),
            jarFile, dockerComposeFile);
        ProjectJarFileUploadView projectJarFileUploadView = new ProjectJarFileUploadView(id);
        return ResponseEntity.ok(projectJarFileUploadView);
    }

    @PatchMapping("/jarFile")
    public ResponseEntity<ProjectJarFileUploadView> dockerComposeFileUpdate(
        @RequestPart ProjectIdDto projectIdDto, @RequestPart MultipartFile dockerComposeFile,
        @AuthenticationPrincipal UserLoginContext userLoginContext) {
        projectBuildUploadService.dockerFileUpdate(projectIdDto.getProjectId(), dockerComposeFile);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/jarFile")
    public ResponseEntity<List<ProjectBuildView>> jarFileList(
        @PathVariable("projectId") Integer projectId) {
        List<ProjectBuildView> allByProjectId = projectBuildFindService.findAllByProjectId(
            projectId);
        return ResponseEntity.ok(allByProjectId);
    }

    @PatchMapping("/jarFile/{projectJarFileId}/end-point")
    public ResponseEntity<ProjectApiDocsForTestView> apiAndJarApiCompare(
        @PathVariable(name = "projectJarFileId") Integer projectJarFileId) {
        ProjectApiDocsForTestView view = projectApiDocsSettingService.forTestInfo(projectJarFileId);
        return ResponseEntity.ok(view);
    }

    @PatchMapping("/jarFile/test/run")
    public ResponseEntity<Void> testRun(
        @RequestBody ProjectBuildTestRunRequest projectBuildTestRunRequest,
        @AuthenticationPrincipal UserLoginContext userLoginContext) {
        projectTestRunService.testRunRequest(projectBuildTestRunRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/jarFile/test/stop")
    public ResponseEntity<Void> testStop(@RequestBody ProjectBuildTestStopRequest request) {
        projectTestStopService.stop(request.getProjectJarFileId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/jarFile/deploy")
    public ResponseEntity<ProjectBuildView> findDeploymentByProjectId(
        @PathVariable("projectId") Integer projectId) {
        return ResponseEntity.ok(
            projectBuildFindService.findByProjectIdAndDeploymentTrue(projectId));
    }

    @PostMapping("/jarFile/deploy")
    public ResponseEntity<Void> deployProject(@RequestBody ProjectBuildIdDto projectBuildIdDto,
        @AuthenticationPrincipal UserLoginContext userLoginContext) {
        projectDeployService.projectDeployStartRequest(projectBuildIdDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/jarFile/deploy")
    public ResponseEntity<Void> stopProject(@RequestBody ProjectBuildIdDto projectBuildIdDto,
        @AuthenticationPrincipal UserLoginContext userLoginContext) {
        projectDeployService.projectDeployStopRequest(projectBuildIdDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/jarFile/{projectJarFileId}")
    public ResponseEntity<Void> deleteJarFile(
        @PathVariable(name = "projectJarFileId") Integer projectJarFileId,
        @AuthenticationPrincipal UserLoginContext userLoginContext) {
        projectBuildRemoveService.removeProjectBuild(projectJarFileId);
        return ResponseEntity.noContent().build();
    }
}
