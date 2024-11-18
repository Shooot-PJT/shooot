package com.shooot.application.api.ui;

import com.shooot.application.api.service.command.test.DocsLoginService;
import com.shooot.application.api.service.command.test.TestCaseRequestService;
import com.shooot.application.api.ui.dto.ProjectClientTotalLoginRequest;
import com.shooot.application.api.ui.dto.TestCaseResponseView;
import com.shooot.application.project.domain.Project;
import com.shooot.application.security.service.UserLoginContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import reactor.netty.http.Cookies;

import javax.swing.*;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projectClient")
@Slf4j
public class ProjectClientController {
    private final TestCaseRequestService testCaseRequestService;
    private final DocsLoginService docsLoginService;
    private final RestClient restClient;

    @PostMapping("/testcases/{testcaseId}")
    public ResponseEntity<?> sendTestCaseRequest(
        @PathVariable Integer testcaseId,
        @AuthenticationPrincipal UserLoginContext userLoginContext
    ){
        Integer userId = userLoginContext.getUserId();
        TestCaseResponseView testCaseResponseView = testCaseRequestService.testCaseResponse(testcaseId, userId);

        return ResponseEntity.ok(testCaseResponseView);
    }

    @PostMapping("/login")
    public ResponseEntity<?> totalLogin(
        @RequestBody ProjectClientTotalLoginRequest projectClientTotalLoginRequest,
        HttpSession httpSession
    )
    {
        log.info("projectClientLoginRequest = {}, {}, {}, {}, {}", projectClientTotalLoginRequest.getId(), projectClientTotalLoginRequest.getPassword(), projectClientTotalLoginRequest.getUrl(), projectClientTotalLoginRequest.getSessionName(), projectClientTotalLoginRequest.getProjectId());
        ResponseEntity<?> value = docsLoginService.getSessionValue(projectClientTotalLoginRequest, httpSession);

        return ResponseEntity.ok(value);
    }

    @GetMapping("/loginTest")
    public ResponseEntity<?> logintest(@RequestHeader HttpHeaders headers, HttpSession session) {
        // JSESSIONID 추출
        log.info("headers = {}", headers);
        log.info("session = {}", session.getAttribute("sessionId"));

        HttpHeaders filteredHeaders = new HttpHeaders();
        headers.forEach((key, values) -> {
            log.info("key = {}, value = {}", key, values);
            if ("Cookie".equalsIgnoreCase(key)) {
                for (String value : values) {
                    if (value.contains("JSESSIONID")) {
                        filteredHeaders.add("Cookie", (String) session.getAttribute("sessionId"));
                    }
                }
            }
        });

        // RestClient로 B 서버에 요청
        return restClient.get()
                .uri("http://localhost:8081/login/test")
//                .headers(httpHeaders -> {
//                    httpHeaders.add(HttpHeaders.COOKIE, (String)session.getAttribute("sessionId")); // 세션 쿠키 추가
//                })
                .headers(httpHeaders -> httpHeaders.addAll(filteredHeaders))
                .retrieve()
                .toEntity(String.class);
    }


    @PostMapping("/postman")
    public void logHeaders(@RequestHeader HttpHeaders headers, @RequestBody Map<String, Object> requestBody) {
        // 헤더 정보 출력
        System.out.println("Received Headers: " + headers);
        System.out.println("requestBody = " + requestBody);
    }
}
