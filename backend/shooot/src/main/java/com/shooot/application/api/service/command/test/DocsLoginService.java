package com.shooot.application.api.service.command.test;

import com.shooot.application.api.ui.dto.DocsLoginRequest;
import com.shooot.application.api.ui.dto.RestClientResponse;
import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.InternalException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
public class DocsLoginService {
//    private final RestClient restClient;
//    private final ProjectRepository projectRepository;
//
//    public ResponseEntity<?> getSessionValue(ProjectClientTotalLoginRequest projectClientTotalLoginRequest, HttpSession session){
////        Project project = projectRepository.findById(projectClientTotalLoginRequest.getProjectId())
////                .orElseThrow(ProjectNotFoundException::new);
//
////        String projectEnglishName = project.getEnglishName();
////        String url = "https://" + projectEnglishName + ".shooot.shop/" + projectClientTotalLoginRequest.getUrl();
//        String url = "http://localhost:8081" + projectClientTotalLoginRequest.getUrl();
//
//        Map<String, String> loginRequest = new HashMap<>();
//        loginRequest.put("id", projectClientTotalLoginRequest.getId());
//        loginRequest.put("password", projectClientTotalLoginRequest.getPassword());
//
//        ResponseEntity<?> response = restClient.post()
//                .uri(url)
//                .body(loginRequest)
//                .retrieve()
//                .toEntity(String.class);
//
//        log.info("response.getBody = {}", response.getBody());
//        log.info("response.getHeaders{}", response.getHeaders());
//        log.info("response.getStatusCode() = {}", response.getStatusCode().value());
//
//        // Set-Cookie 헤더에서 세션 ID 추출
//        List<String> cookies = response.getHeaders().get(HttpHeaders.SET_COOKIE);
//        if (cookies != null && !cookies.isEmpty()) {
//            String rawCookie = cookies.get(0); // 예: JSESSIONID=F388D35B37DB9A1650D5867280E50B66; Path=/; HttpOnly
//            String sessionId = rawCookie.split(";")[0]; // "JSESSIONID=F388D35B37DB9A1650D5867280E50B66" 추출
//            log.info("Extracted Session ID: {}", sessionId);
//            session.setAttribute("sessionId", sessionId);
//            return ResponseEntity.ok(sessionId); // 세션 ID 반환
//        }
//
//        return ResponseEntity.ok(null);
//    }



    private final RestClient restClient;
    private final ProjectRepository projectRepository;

    public ResponseEntity<?> login(Map<String, Object> request) throws Exception {

        if(request.get("projectId") == null){
            throw new RuntimeException("projectId를 넣어라");
        }

        Object obj = request.get("projectId");
        if(!(obj instanceof Integer)){
            throw new RuntimeException("projectId의 타입이상하다");
        }

        Integer projectId = (Integer) request.get("projectId");

        Project project = projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);

//        final String url = "https://%s.shooot.shop".formatted(project.getEnglishName()) + "/" + docsLoginRequest.getUrl();

        if(request.get("endpoint") == null) throw new RuntimeException("엔드포인트없음");

        final String url = "http://localhost:8081" + "/" + ((String)request.get("endpoint"));

        Map<String, String> requestBody = new HashMap<>();

        for(String key : request.keySet()){
            if("projectId".equals(key) || "endpoint".equals(key)) continue;

            requestBody.put(key, (String) request.get(key));
        }

        ResponseEntity<?> response = null;
        try{
            response = restClient.post()
                    .uri(url)
                    .body(requestBody)
                    .retrieve()
                    .toEntity(String.class);

            log.info("response.getBody = {}", response.getBody());
            log.info("response getHeaders = {}", response.getHeaders());
            log.info("response statusCode = {}", response.getStatusCode());

            return response;
        }  catch (WebClientResponseException e) {
            log.error("HTTP 에러 발생 - 상태 코드: {}, 메시지: {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            return ResponseEntity.status(e.getStatusCode())
                    .body(RestClientResponse.builder()
                            .responseCode(e.getStatusCode().value())
                            .responseMessage(e.getResponseBodyAsString())
                            .session(null)
                            .build());
        } catch (Exception e) {
            log.error("알 수 없는 에러 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(RestClientResponse.builder()
                            .responseCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .responseMessage(e.getMessage())
                            .session(null)
                            .build());
        }
    }

}
