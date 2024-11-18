package com.shooot.application.api.ui;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.service.command.test.DocsLoginService;
import com.shooot.application.api.service.command.test.TestApiRequestService;
import com.shooot.application.api.service.command.test.TestCaseRequestService;
import com.shooot.application.api.ui.dto.DocsLoginRequest;
import com.shooot.application.api.ui.dto.RestClientResponse;
import com.shooot.application.api.ui.dto.TestCaseResponseView;
import com.shooot.application.security.service.UserLoginContext;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projectClient")
@Slf4j
public class ProjectClientController {
    private final TestCaseRequestService testCaseRequestService;
    private final DocsLoginService docsLoginService;
    private final RestClient restClient;
    private final TestApiRequestService testApiRequestService;

    @PostMapping("/testcases/{testcaseId}")
    public ResponseEntity<?> sendTestCaseRequest(
            @PathVariable Integer testcaseId,
            String session,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        TestCaseResponseView testCaseResponseView = testCaseRequestService.testCaseResponse(testcaseId, userId, session);

        return ResponseEntity.ok(testCaseResponseView);
    }

    @PostMapping("/testcases/api/{apiId}")
    public ResponseEntity<?> sendAllTestCaseOfApiRequest(
            @PathVariable Integer apiId,
            String session,
            @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        List<TestCaseResponseView> result = testApiRequestService.allTestcaseOfApi(apiId, userId, session);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> totalLogin(
            @RequestBody DocsLoginRequest docsLoginRequest
    )
    throws Exception{
        log.info("docsLoginRequets = {}", docsLoginRequest);
        log.info("endpoint =  {}",docsLoginRequest.getEndpoint());
        String infoString = docsLoginRequest.getInfo();

        if(infoString == null){
            return ResponseEntity.badRequest().body("필드 다 안채웠음");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, Object>> infoList = objectMapper.readValue(infoString, List.class);
        Map<String, Object> requestBody = new HashMap<>();

        for (Map<String, Object> mapItem : infoList) {
            for (String key : mapItem.keySet()){
;               log.info("key = {}, value = {}", key, mapItem.get(key));
                requestBody.put(key, mapItem.get(key));
            }

        }

        requestBody.put("endpoint", docsLoginRequest.getEndpoint());
        requestBody.put("projectId", docsLoginRequest.getProjectId());
        // 이까지 가공

        ResponseEntity<?> response = docsLoginService.login(requestBody);

        if(response.getStatusCode().value() != 200){
            return response;
        }

        HttpHeaders responseHeaders = response.getHeaders();
        List<String> cookies = new ArrayList<>(responseHeaders.get(HttpHeaders.SET_COOKIE) != null
                ? responseHeaders.get(HttpHeaders.SET_COOKIE)
                : Collections.emptyList());

        log.info("responseHeaders = {}", responseHeaders);
        log.info("cookies = {}", cookies);

        if (response.getStatusCode().is2xxSuccessful() && cookies != null && !cookies.isEmpty()) {
            Map<String, String> responseData = new HashMap<>();
            responseData.put(HttpHeaders.SET_COOKIE, cookies.get(0));

            cookies.clear();

            RestClientResponse restClientResponse = RestClientResponse.builder()
                    .session(responseData.get(HttpHeaders.SET_COOKIE))
                    .responseCode(response.getStatusCode().value())
                    .responseMessage((String)response.getBody())
                    .build();

            return ResponseEntity.ok(restClientResponse);

//            return ResponseEntity
//                    .status(response.getStatusCode())
//                    .body(responseData);
        }


        return null;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
//        return restClient.
        return null;
    }

    @PostMapping("/postman")
    public void logHeaders(@RequestHeader HttpHeaders headers, @RequestBody Map<String, Object> requestBody) {
        // 헤더 정보 출력
        System.out.println("Received Headers: " + headers);
        System.out.println("requestBody = " + requestBody);
    }
}
