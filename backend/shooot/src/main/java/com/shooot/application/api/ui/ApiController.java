package com.shooot.application.api.ui;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.domain.interceptor.ProjectDomainType;
import com.shooot.application.api.domain.interceptor.RequiresProjectParticipation;
import com.shooot.application.api.service.command.api.ApiCreateService;
import com.shooot.application.api.service.command.api.ApiDeleteService;
import com.shooot.application.api.service.command.api.ApiModifyService;
import com.shooot.application.api.service.command.api.dto.ApiCreateRequest;
import com.shooot.application.api.service.command.api.dto.ApiModifyRequest;
import com.shooot.application.api.service.command.api.dto.ApiToggleModifyRequest;
import com.shooot.application.api.service.query.api.ApiGetService;
import com.shooot.application.api.ui.dto.ApiDetailListView;
import com.shooot.application.api.ui.dto.ApiView;
import com.shooot.application.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/domains")
@Slf4j
public class ApiController {
    private final ApiCreateService apiCreateService;
    private final ApiDeleteService apiDeleteService;
    private final ApiModifyService apiModifyService;
    private final ApiGetService apiGetService;

    @PostMapping("/{domainId}/apis")
    @RequiresProjectParticipation(type = ProjectDomainType.DOMAIN)
    public ResponseEntity<?> createApi(
            @PathVariable(name = "domainId") Integer domainId,
            @RequestBody ApiCreateRequest apiCreateRequest,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        ApiView saveApi = apiCreateService.createApi(domainId, apiCreateRequest, userId);

        return ResponseEntity.ok(saveApi);
    }

    @PatchMapping("/apis/{apiId}")
    @RequiresProjectParticipation(type = ProjectDomainType.API)
    public ResponseEntity<?> modifyApi(
            @PathVariable(name = "apiId") Integer apiId,
            @RequestBody ApiModifyRequest apiModifyRequest,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ) throws Exception{
        log.info("apiModifyRequest = {}", apiModifyRequest);
        Integer userId = userLoginContext.getUserId();
        ApiView modifyApi = apiModifyService.modifyApi(apiId, apiModifyRequest, userId);

        return ResponseEntity.ok(modifyApi);
    }

    @PatchMapping("/apis/{apiId}/toggle")
    @RequiresProjectParticipation(type = ProjectDomainType.API)
    public ResponseEntity<?> modifyApiToggle(
            @PathVariable(name = "apiId") Integer apiId,
            @RequestBody ApiToggleModifyRequest apiToggleModifyRequest
    ){
        ApiView modifyApi = apiModifyService.modifyApiToggle(apiId, apiToggleModifyRequest);

        return ResponseEntity.ok(modifyApi);
    }


    @DeleteMapping("/apis/{apiId}")
    @RequiresProjectParticipation(type = ProjectDomainType.API)
    public ResponseEntity<?> deleteApi(
            @PathVariable(name = "apiId") Integer apiId,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        log.info("들어옴");
        Integer userId = userLoginContext.getUserId();
        apiDeleteService.deleteApi(apiId, userId);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/{domainId}/apis")
    @RequiresProjectParticipation(type = ProjectDomainType.DOMAIN)
    public ResponseEntity<?> getListApi(
            @PathVariable(name = "domainId") Integer domainId
    ){
        List<ApiView> apiViewList = apiGetService.getApiList(domainId);

        return ResponseEntity.ok(apiViewList);
    }

    @GetMapping("/apis/{apiId}")
    @RequiresProjectParticipation(type = ProjectDomainType.API)
    public ResponseEntity<?> getApi(
            @PathVariable(name = "apiId") Integer apiId
    ){
        ApiDetailListView apiDetailListView = apiGetService.getApiWithTestCases(apiId);

        return ResponseEntity.ok(apiDetailListView);
    }




}
