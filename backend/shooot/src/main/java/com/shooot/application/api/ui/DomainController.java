package com.shooot.application.api.ui;

import com.shooot.application.api.domain.interceptor.ProjectDomainType;
import com.shooot.application.api.domain.interceptor.RequiresProjectParticipation;
import com.shooot.application.api.service.command.domain.DomainCreateService;
import com.shooot.application.api.service.command.domain.DomainDeleteService;
import com.shooot.application.api.service.query.domain.DomainListService;
import com.shooot.application.api.service.command.domain.DomainModifyService;
import com.shooot.application.api.service.command.domain.dto.DomainCreateRequest;
import com.shooot.application.api.service.command.domain.dto.DomainModifyRequest;
import com.shooot.application.api.ui.dto.DomainView;
import com.shooot.application.security.service.UserLoginContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
@Slf4j
public class DomainController {
    private final DomainCreateService domainCreateService;
    private final DomainDeleteService domainDeleteService;
    private final DomainModifyService domainModifyService;
    private final DomainListService domainListService;

    @PostMapping("/domains")
    public ResponseEntity<?> createService(@RequestBody DomainCreateRequest domainCreateRequest){
        DomainView saveDomain = domainCreateService.createService(domainCreateRequest);

        return ResponseEntity.ok(saveDomain);
    }

    @DeleteMapping("/domains/{domainId}")
    @RequiresProjectParticipation(type = ProjectDomainType.DOMAIN)
    public ResponseEntity<?> deleteService(@PathVariable(name = "domainId") Integer domainId){
        domainDeleteService.deleteDomain(domainId);

        return ResponseEntity.ok(null);
    }

    @PatchMapping("/domains/{domainId}")
    @RequiresProjectParticipation(type = ProjectDomainType.DOMAIN)
    public ResponseEntity<?> modifyService(
            @PathVariable(name = "domainId") Integer domainId,
            @RequestBody DomainModifyRequest domainModifyRequest
            ){
        DomainView updateDomain = domainModifyService.modifyDomain(domainId, domainModifyRequest);

        return ResponseEntity.ok(updateDomain);
    }

    @GetMapping("/{projectId}/domains")
    @RequiresProjectParticipation(type = ProjectDomainType.PROJECT)
    public ResponseEntity<?> getListService(
            @PathVariable(name = "projectId") Integer projectId,
            @AuthenticationPrincipal UserLoginContext context
    ){
        Integer userId = context.getUserId();
        List<DomainView> domains = domainListService.getDomainList(projectId, userId);

        return ResponseEntity.ok(domains);
    }

}
