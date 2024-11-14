package com.shooot.application.api.service.command.testcase;

import com.shooot.application.api.domain.*;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.domain.repository.ApiTestFileRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.testcase.TestCaseFileExtensionNotAllowException;
import com.shooot.application.api.ui.dto.ApiTestCaseView;
import com.shooot.application.common.infra.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiTestCaseCreateService {
    private final ApiRepository apiRepository;
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;
    private final ApiTestFileRepository apiTestFileRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public ApiTestCaseView create(Integer apiId, Map<String, Object> request){
        ApiTestCase apiTestCase = createApiTestCase(apiId, request);
        ApiTestCaseRequest apiTestCaseRequest = createApiTestCaseRequest(apiTestCase, request);

        return ApiTestCaseView.from(apiTestCase, apiTestCaseRequest);
    }

    private ApiTestCase createApiTestCase(Integer apiId, Map<String, Object> request){
        Api api = apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);

        ApiTestCase apiTestCase = ApiTestCase.builder()
                .api(api)
                .title((String)request.get("title"))
                .httpStatus(HttpStatus.valueOf((Integer) request.get("httpStatusCode")))
                .build();

        return apiTestCaseRepository.save(apiTestCase);
    }

    @Transactional
    public ApiTestCaseRequest createApiTestCaseRequest(ApiTestCase apiTestCase, Map<String, Object> request){


        Optional<Map<String, Object>> filesOptional = Optional.ofNullable(request)
                .map(element -> (Map<String, Object>) element.get("content"))
                .map(element -> (Map<String, Object>) element.get("body"))
                .map(element -> (Map<String, Object>) element.get("formData"))
                .map(element -> (Map<String, Object>) element.get("files"));

        if(filesOptional.isPresent()){
            Map<String, Object> files = filesOptional.get();

            for(String uuid : files.keySet()){
                Map<String, Object> fileData = (Map<String, Object>) files.get(uuid);

                for(String key : fileData.keySet()){
                    String fileName = key;
                    System.out.println("asdfasdf");
                    log.info("filedetail = {}", fileData.get(fileName));
                    List<Object> fileDetail = (List<Object>)fileData.get(fileName);

                    // TODO : 로컬에 저장
                    // TODO : 파일을 확장자명 떼서 해당 파일로 변환하기
                    String base64String = (String) fileDetail.get(0);
                    String filePath = fileStorageService.uploadFile(base64String);
                    File file = new File(filePath);
                    log.info("filePath = {}", filePath);

                    fileDetail.set(0, filePath);
                    saveTestCaseFile(file, apiTestCase, key);
                }
            }
        }

        log.info("content = {}", request.get("content"));

        ApiTestCaseRequestType type = ApiTestCaseRequestType.valueOf(request.get("type").toString().toUpperCase());

        ApiTestCaseRequest apiTestCaseRequest = ApiTestCaseRequest.builder()
                .apiTestCase(apiTestCase)
//                .type(request.get("type").equals("json") ? ApiTestCaseRequestType.JSON : ApiTestCaseRequestType.MULTIPART)
                .type(type)
                .content((Map<String, Object>) request.get("content"))
                .build();

        return apiTestCaseRequestRepository.save(apiTestCaseRequest);
    }

    private void saveTestCaseFile(File file, ApiTestCase apiTestCase, String originalFileName){
        ApiTestFile apiTestFile = ApiTestFile
                .builder()
                .testCaseId(apiTestCase)
                .location(file.getAbsolutePath())
                .extension(getFileExtension(file))
                .originalName(originalFileName)
                .size((int) file.length())
                .build();


        apiTestFileRepository.save(apiTestFile);
    }

    private String getFileExtension(File file){
        String fileName = file.getName();
        log.info("fileName = {}", fileName);
        int dotIndex = fileName.lastIndexOf(".");

        if(dotIndex > 0){
            return fileName.substring(dotIndex + 1);
        } else{
            log.info("확장자명 없는뎅뇨?");
            throw new TestCaseFileExtensionNotAllowException();
        }
    }

}
