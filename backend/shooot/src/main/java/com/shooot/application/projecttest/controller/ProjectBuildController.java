package com.shooot.application.projecttest.controller;

import com.shooot.application.projecttest.service.dto.ProjectIdDto;
import com.shooot.application.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/projects")
@RestController
public class ProjectBuildController {

    @PostMapping("/jarFile")
    public ResponseEntity<?> jarFileUpload(ProjectIdDto projectIdDto, @RequestParam MultipartFile jarFile, @RequestParam MultipartFile dockerComposeFile, @AuthenticationPrincipal UserLoginContext userLoginContext) {

    }
}
