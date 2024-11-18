package com.shooot.application.api.service.command.test;

import com.shooot.application.api.ui.dto.ProjectClientTotalLoginRequest;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
public class DocsLoginService {
    private final RestClient restClient;
    private final ProjectRepository projectRepository;

    public ResponseEntity<?> getSessionValue(ProjectClientTotalLoginRequest projectClientTotalLoginRequest, HttpSession session){
//        Project project = projectRepository.findById(projectClientTotalLoginRequest.getProjectId())
//                .orElseThrow(ProjectNotFoundException::new);

//        String projectEnglishName = project.getEnglishName();
//        String url = "https://" + projectEnglishName + ".shooot.shop/" + projectClientTotalLoginRequest.getUrl();
        String url = "http://localhost:8081" + projectClientTotalLoginRequest.getUrl();

        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("id", projectClientTotalLoginRequest.getId());
        loginRequest.put("password", projectClientTotalLoginRequest.getPassword());

        ResponseEntity<?> response = restClient.post()
                .uri(url)
                .body(loginRequest)
                .retrieve()
                .toEntity(String.class);

        log.info("response.getBody = {}", response.getBody());
        log.info("response.getHeaders{}", response.getHeaders());
        log.info("response.getStatusCode() = {}", response.getStatusCode().value());

        // Set-Cookie 헤더에서 세션 ID 추출
        List<String> cookies = response.getHeaders().get(HttpHeaders.SET_COOKIE);
        if (cookies != null && !cookies.isEmpty()) {
            String rawCookie = cookies.get(0); // 예: JSESSIONID=F388D35B37DB9A1650D5867280E50B66; Path=/; HttpOnly
            String sessionId = rawCookie.split(";")[0]; // "JSESSIONID=F388D35B37DB9A1650D5867280E50B66" 추출
            log.info("Extracted Session ID: {}", sessionId);
            session.setAttribute("sessionId", sessionId);
            return ResponseEntity.ok(sessionId); // 세션 ID 반환
        }

        return ResponseEntity.ok(null);
    }

}
