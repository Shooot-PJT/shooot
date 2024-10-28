package com.shooot.application.api.ui;

import com.shooot.application.api.service.command.domain.DomainCreateService;
import com.shooot.application.api.service.command.domain.DomainDeleteService;
import com.shooot.application.api.service.query.domain.DomainListService;
import com.shooot.application.api.service.command.domain.DomainModifyService;
import com.shooot.application.api.service.command.domain.dto.DomainCreateRequest;
import com.shooot.application.api.service.command.domain.dto.DomainModifyRequest;
import com.shooot.application.api.ui.dto.DomainView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/domains")
@Slf4j
public class DomainController {
    private final DomainCreateService domainCreateService;
    private final DomainDeleteService domainDeleteService;
    private final DomainModifyService domainModifyService;
    private final DomainListService domainListService;

    @PostMapping
    public ResponseEntity<?> createService(DomainCreateRequest domainCreateRequest){
        DomainView saveDomain = domainCreateService.createService(domainCreateRequest);

        return ResponseEntity.ok(saveDomain);
    }

    @DeleteMapping("/{domainId}")
    public ResponseEntity<?> deleteService(@PathVariable(name = "domainId") Integer domainId){
        domainDeleteService.deleteDomain(domainId);

        return ResponseEntity.ok(null);
    }

    @PatchMapping("/{domainId}")
    public ResponseEntity<?> modifyService(
            @PathVariable(name = "domainId") Integer domainId,
            @RequestBody DomainModifyRequest domainModifyRequest
            ){
        DomainView updateDomain = domainModifyService.modifyDomain(domainId, domainModifyRequest);

        return ResponseEntity.ok(updateDomain);
    }

    @GetMapping("/{projectId}/domains")
    public ResponseEntity<?> getListService(@PathVariable(name = "projectId") Integer projectId){
        List<DomainView> domains = domainListService.getDomainList(projectId);
        log.info("domains = {}", domains);

        Map<String, List<DomainView>> response = new HashMap<>();
        response.put("domainList", domains);

        return ResponseEntity.ok(response);
    }

}
