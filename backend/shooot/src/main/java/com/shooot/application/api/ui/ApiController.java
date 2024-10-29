package com.shooot.application.api.ui;

import com.shooot.application.api.service.command.api.ApiCreateService;
import com.shooot.application.api.service.command.api.ApiDeleteService;
import com.shooot.application.api.service.command.api.ApiModifyService;
import com.shooot.application.api.service.command.api.dto.ApiCreateRequest;
import com.shooot.application.api.service.command.api.dto.ApiModifyRequest;
import com.shooot.application.api.service.command.api.dto.ApiToggleModifyRequest;
import com.shooot.application.api.service.query.api.ApiGetService;
import com.shooot.application.api.ui.dto.ApiView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/domains")
public class ApiController {
    private final ApiCreateService apiCreateService;
    private final ApiDeleteService apiDeleteService;
    private final ApiModifyService apiModifyService;
    private final ApiGetService apiGetService;

    @PostMapping("/{domainId}/apis")
    public ResponseEntity<?> createApi(
            @PathVariable(name = "domainId") Integer domainId,
            @RequestBody ApiCreateRequest apiCreateRequest
    ){
        ApiView saveApi = apiCreateService.createApi(domainId, apiCreateRequest);

        return ResponseEntity.ok(saveApi);
    }

    @PatchMapping("/apis/{apiId}")
    public ResponseEntity<?> modifyApi(
            @PathVariable(name = "apiId") Integer apiId,
            @RequestBody ApiModifyRequest apiModifyRequest
    ){
        ApiView modifyApi = apiModifyService.modifyApi(apiId, apiModifyRequest);

        return ResponseEntity.ok(modifyApi);
    }

    @PatchMapping("/apis/{apiId}/toggle")
    public ResponseEntity<?> modifyApiToggle(
            @PathVariable(name = "apiId") Integer apiId,
            @RequestBody ApiToggleModifyRequest apiToggleModifyRequest
    ){
        ApiView modifyApi = apiModifyService.modifyApiToggle(apiId, apiToggleModifyRequest);

        return ResponseEntity.ok(modifyApi);
    }


    @DeleteMapping("/apis/{apiId}")
    public ResponseEntity<?> deleteApi(@PathVariable(name = "apiId") Integer apiId){
        apiDeleteService.deleteApi(apiId);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/{domainId}/apis")
    public ResponseEntity<?> getListApi(
            @PathVariable(name = "domainId") Integer domainId
    ){
        List<ApiView> apiViewList = apiGetService.getApiList(domainId);

        return ResponseEntity.ok(apiViewList);
    }

    @GetMapping("/apis/{apiId}")
    public ResponseEntity<?> getApi(
            @PathVariable(name = "apiId") Integer apiId
    ){
        ApiView apiView = apiGetService.getApi(apiId);

        return ResponseEntity.ok(apiView);
    }




}
