package com.shooot.application.api.service.command.test;

import com.shooot.application.api.domain.*;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.domain.repository.ApiTestLogRepository;
import com.shooot.application.api.exception.testcase.TestCaseNotFoundException;
import com.shooot.application.api.ui.dto.TestCaseResponseView;
import com.shooot.application.common.infra.storage.exception.FileNotFoundException;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.exception.ProjectNotDeployException;
import com.shooot.application.project.exception.ProjectNotFoundException;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.channels.ClosedChannelException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TestCaseRequestService {
    private final RestClient restClient;
    private final ApiTestCaseRequestRepository testCaseRequestRepository;
    private final ApiTestCaseRepository testCaseRepository;
    private final ApiTestLogRepository apiTestLogRepository;
    private final ProjectParticipantRepository projectParticipantRepository;
    private final UserRepository userRepository;


    // 영문명.shooot.shop (project테이블에 있음)
//    private final String serverURL = "http://localhost:8081/";

    @Transactional
    public TestCaseResponseView testCaseResponse(Integer testcaseId, Integer userId, String session){

        ApiTestCase apiTestCase = testCaseRepository.findById(testcaseId)
                .orElseThrow(TestCaseNotFoundException::new);
        ApiTestCaseRequest latestRequest = getLatestRequest(testcaseId);
        log.info("latestRequest = {}, {}", latestRequest.getContent(), latestRequest.getId());

        log.info(apiTestCase.getApi().getMethod());
        Map<String, Object> content = (Map<String, Object>) latestRequest.getContent();
        log.info("content = {}", content);

        String requestMethod = apiTestCase.getApi().getMethod();
        String requestURL = extractPathVariablesToURL(apiTestCase.getApi().getUrl(), content);
        log.info("requestMethod = {}, requestURL = {}", requestMethod, requestURL);

        Map<String, String> headers = extractHeaders(latestRequest.getType(), content);
        if(headers != null) headers.put("Cookie", session);
        log.info("headers = {}", headers);

        String parameters = extractParameters(content);
        log.info("parameters = {}", parameters);

        String serverURL = "https://%s.shooot.shop".formatted(apiTestCase.getApi().getDomain().getProject().getEnglishName());

        String url = serverURL + requestURL + parameters;
        log.info("complete URL = {}", url);

        Map<String, Object> body = (Map<String, Object>) content.get("body");
        log.info("body = {}", body);
        Map<String, Object> requestBody = extractRequestBody(body);
        log.info("requestBody = {}", requestBody);

        Map<String, Object> formData = extractFormData(body);
        log.info("formData = {}", formData);


//        Map<String, Object> requestData = new HashMap<>();
//        String method = apiTestCase.getApi().getMethod().toUpperCase();
//        requestData.put("method", method);
//        requestData.put("url", url);
//        requestData.put("headers", headers);
//        requestData.put("requestBody", requestBody);
//        requestData.put("formData", formData);
        // TODO : 사용자의 spring에 rest보내기
        ResponseEntity<?> response = restToUserServer(requestMethod, url, headers, requestBody, formData, latestRequest.getType());

        log.info("end response = {}", response);

        // TODO : response를 api_test_log 테이블에 데이터 저장하기
        saveLog(response, testcaseId, userId, headers, content);

        // TODO : testcase request를 수행함에 따라 테스트케이스의 테스트 상태를 변경해줘야한다.
        ApiTestStatusType testResult = (apiTestCase.getHttpStatus().value() == response.getStatusCode().value()) ? ApiTestStatusType.SUCCESS : ApiTestStatusType.FAIL;
        apiTestCase.update(testResult);

        TestCaseResponseView testCaseResponseView = TestCaseResponseView
                .builder()
                .testcaseId(testcaseId)
                .testResult(testResult.name())
                .build();

        return testCaseResponseView;
    }

    private ApiTestCaseRequest getLatestRequest(Integer testcaseId){
        Pageable pageable = PageRequest.of(0, 1);
        Page<ApiTestCaseRequest> page =  testCaseRequestRepository.findLatestByApiTestCaseId(testcaseId, pageable);

        return page.getContent().isEmpty() ? null : page.getContent().get(0);
    }

    private String extractPathVariablesToURL(String url, Map<String, Object> content){
        Map<String, Object> pathVariableMap = (Map<String, Object>) content.get("pathvariable");

        if(pathVariableMap == null) return url;

        for(String key : pathVariableMap.keySet()){
//            String value = (String) pathVariableMap.get(key);
            List<Object> list = (List<Object>) pathVariableMap.get(key);
            String value = (String) list.get(0);

            url = url.replace("{" + key + "}", value);
        }


        return url;
    }

    private Map<String, String> extractHeaders(ApiTestCaseRequestType contentType, Map<String, Object> content){
        Map<String, Object> headersMap = (Map<String, Object>) content.get("headers");
        if(headersMap == null) return null;

        Map<String, String> newHeadersMap = new HashMap<>();

        for(String key : headersMap.keySet()){
            if(key.equals("ContentType")) continue;
            List<Object> headerDetail = (List<Object>) headersMap.get(key);
//            newHeadersMap.put(key, (String) headersMap.get(key)[0]);
            newHeadersMap.put(key, (String) headerDetail.get(0));
        }

//        if(contentType.toString().toUpperCase().equals("MULTIPART")){
//            newHeadersMap.put("Content-type", "multipart/form-data");
//        } else if(contentType.toString().toUpperCase().equals("JSON")){
//            newHeadersMap.put("Content-type", "application/json");
//        }

        return newHeadersMap;
    }

    private String extractParameters(Map<String, Object> content){
        Map<String, Object> params = (Map<String, Object>) content.get("params");

        if(params == null) return "";

        String queryString = "?" + params.entrySet().stream()
                // 각 엔트리에서 key와 value를 List<Object>로 캐스팅 후 첫 번째 값 사용
                .map(entry -> {
                    List<Object> values = (List<Object>) entry.getValue();  // List<Object>로 캐스팅
                    return entry.getKey() + "=" + values.get(0);  // 첫 번째 값 사용
                })
                // 각 파라미터를 &로 연결하여 하나의 문자열로 만듬
                .collect(Collectors.joining("&"));

        return queryString;
    }

    private Map<String, Object> extractRequestBody(Map<String, Object> body){
//        Map<String, Object[]> requestBody = (Map<String, Object[]>) body.get("raw");
        Map<String, Object> requestBody = (Map<String, Object>) body.get("raw");
        if(requestBody == null) return null;

        Map<String, Object> newRequestBody = new HashMap<>();

        for(String key : requestBody.keySet()){
            List<Object> list = (List<Object>) requestBody.get(key);
            newRequestBody.put(key, list.get(0));
        }

        return newRequestBody;
    }

    private Map<String, Object> extractFormData(Map<String, Object> body){
        Map<String, Object> formDataInBody = (Map<String, Object>) body.get("formData");
//        Map<String, Object[]> datas = (Map<String, Object[]>) formData.get("datas");
        if(formDataInBody == null) return null;

        Map<String, Object> datas = extractDataInFormData(formDataInBody);
        log.info("datas = {}", datas);

        Map<String, Object> files = extractFilesInFormData(formDataInBody);
        log.info("files = {}", files);

        Map<String, Object> formData = new HashMap<>();

        if(datas != null){
            formData.put("data", datas);
        }

        if(files != null){
            formData.put("files", files);
        }


        return formData;
    }

    private Map<String, Object> extractDataInFormData(Map<String, Object> formData){
        Map<String, Object> datas = (Map<String, Object>) formData.get("datas");
        if(datas == null) return null;

        Map<String, Object> newData = new HashMap<>();

        for(String key : datas.keySet()){
//            newData.put(key, datas.get(key)[0]);
            List<Object> dataList = (List<Object>) datas.get(key);
            newData.put(key, dataList.get(0));
        }

        return newData;
    }

    private Map<String, Object> extractFilesInFormData(Map<String, Object> formData){
        Map<String, Object> files = (Map<String, Object>) formData.get("files");

        if(files == null) return null;

        Map<String, Object> filesData = new HashMap<>();

        for(String uuid : files.keySet()){
            Map<String, Object> fileInfo = (Map<String, Object>) files.get(uuid);

            for(String fileName : fileInfo.keySet()){
                List<Object> fileDetail = (List<Object>) fileInfo.get(fileName);
                String fileLocation = (String) fileDetail.get(0);

                Map<String, String> fileDescAndParam = (Map<String, String>) fileDetail.get(1);

                String fileDescription = fileDescAndParam.get("description");
                String fileParameterName = fileDescAndParam.get("parameterVar");


                filesData.put(fileParameterName, fileLocation);
//                String fileLocation = (String) fileInfo.get(fileName)[0];
//                Map<String, Object> fileDetail = (Map<String, Object>) fileInfo.get(fileName)[1];
//
//                String parameterName = (String) fileDetail.get("parameterVar");
//                filesData.put(parameterName, fileLocation);
            }

        }

        log.info("filesData = {}", filesData);

        for(String key : filesData.keySet()){
            String fileLocation = (String) filesData.get(key);

            log.info("file location = {}", fileLocation);
            Path path = Paths.get(fileLocation);

            try{
                File file = new File(fileLocation);
                log.info("fileSize = {}", file.length());
                log.info("fileSize = {}", Files.readAllBytes(path).length);

//                filesData.put(key, Files.readAllBytes(path));
//                filesData.put(key, new FileSystemResource(path));
                filesData.put(key, fileLocation);
            } catch(IOException e){
                e.printStackTrace();
                log.info("File에서 업로드하는데 문제가 생김");
                throw new FileNotFoundException();
            }
        }


        return filesData;
    }

    //restToUserServer(method, url, headers, requestBody, formData);
    private ResponseEntity<?> restToUserServer(
            String method,
            String url,
            Map<String, String> headers,
            Map<String, Object> requestBody,
            Map<String, Object> formData,
            ApiTestCaseRequestType contentType
    ){
        /*
                requestData.put("method", method);
                requestData.put("url", url);
                requestData.put("headers", headers);
                requestData.put("requestBody", requestBody);
                requestData.put("formData", formData); map안에 key = data, files 2개 있음
         */

        log.info("Test to Server, method = {}, url = {}, headers = {}, requestBody = {}, formData = {}, content-type={}", method, url, headers, requestBody, formData, contentType);

        try{
            ResponseEntity<?> response = null;
            if(contentType == ApiTestCaseRequestType.MULTIPART){
                log.info("multipart 타입으로 유저 서버에 전송");
                response = sendFormDataToServer(method, url, headers, formData);
            } else if(contentType == ApiTestCaseRequestType.JSON){
                log.info("json 타입으로 유저 서버에 전송");
                response = sendRequestBodyToServer(method, url, headers, requestBody);
            } else{
                log.info("Content-type이 null 즉 none인걸로 유저 서버에 전송");
                response = sendNoneDataToServer(method, url, headers);
            }

            log.info("total Response = {}, body = {}, header = {}, statusCode = {}", response, response.getBody(), response.getHeaders(), response.getStatusCode().value());
            return response;
        } catch(ResourceAccessException e){
            e.printStackTrace();
            throw new ProjectNotDeployException();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("서버와의 연결에 실패했습니다.");
        }

//        return null;

    }

    private ResponseEntity<?> sendFormDataToServer(
            String method,
            String url,
            Map<String, String> headers,
            Map<String, Object> requestFormData
    ) throws Exception{


        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
        Map<String, String> requestFiles = (Map<String, String>) requestFormData.get("files");
        Map<String, Object> requestDatas = (Map<String, Object>) requestFormData.get("data");
        log.info("files = {}", requestFiles);
        log.info("datas = {}", requestDatas);

//        log.info("file Data = {}", requestFiles.get("file1"));
        if(requestFiles != null){
            for(String key : requestFiles.keySet()){
                formData.add(key, new FileSystemResource(requestFiles.get(key)));
            }
//            requestFiles.forEach(formData::add);
        }

        if(requestDatas != null){
            for(String key : requestDatas.keySet()){
                formData.add(key, requestDatas.get(key));
            }
//            requestDatas.forEach(formData::add);
        }
        log.info("다른 서ㅏ버로 보낼 데이터 = {}", requestDatas);


        ResponseEntity<?> response = restClient
                .method(HttpMethod.valueOf(method))
                .uri(url)
                .headers(httpHeaders -> {
                    if(headers != null){
                        headers.forEach(httpHeaders::set);
                    }
                    httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
                })
                .body(formData)
                .retrieve()
                .toEntity(String.class);


        log.info("sendFromDataToServer response = {}, statusCode = {}", response.getBody(), response.getStatusCode().value());

        return response;

    }

    private ResponseEntity<?> sendRequestBodyToServer(
            String method,
            String url,
            Map<String, String> headers,
            Map<String, Object> requestBody
    ) throws Exception{
        ResponseEntity<String> response = restClient
                .method(HttpMethod.valueOf(method))
                .uri(url)
                .headers(httpHeaders -> {
                    if(headers != null){
                        headers.forEach(httpHeaders::set);
                    }
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                })
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .toEntity(String.class);

        log.info("sendFromDataToServer response = {}, statusCode = {}", response.getBody(), response.getStatusCode().value());

        return response;
    }

    private ResponseEntity<String> sendNoneDataToServer(
            String method,
            String url,
            Map<String, String> headers
    ) throws Exception{
        ResponseEntity<String> response = restClient
                .method(HttpMethod.valueOf(method))
                .uri(url)
                .headers(httpHeaders -> {
                    if(headers != null){
                        headers.forEach(httpHeaders::set);
                    }
                })
                .retrieve()
                .toEntity(String.class);

        log.info("sendFromDataToServer response = {}, statusCode = {}", response.getBody(), response.getStatusCode().value());


        return response;
    }

    private void saveLog(ResponseEntity<?> response, Integer testcaseId, Integer userId, Map<String, String> headers, Map<String, Object> body){
        log.info("save Log response = {}", response);
        ApiTestCase apiTestCase = testCaseRepository.findById(testcaseId)
                .orElseThrow();

        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectIdAndUserId(apiTestCase.getApi().getDomain().getProject().getId(), userId);

        ApiTestLog apiTestLog = ApiTestLog.builder()
                .apiTestCase(apiTestCase)
                .httpStatus(apiTestCase.getHttpStatus())
                .isDeleted(false)
                .isSuccess(true)
                .projectParticipant(projectParticipant)
                .httpBody(body)
                .httpHeader(headers)
                .responseCode(HttpStatus.valueOf(response.getStatusCode().value()))
                .responseMessage((String) response.getBody())
                .build();

        apiTestLogRepository.save(apiTestLog);

    }

}
