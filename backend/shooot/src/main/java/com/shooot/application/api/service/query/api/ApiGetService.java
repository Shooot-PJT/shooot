package com.shooot.application.api.service.query.api;

import com.shooot.application.api.domain.*;
import com.shooot.application.api.domain.repository.*;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.ui.ApiTestCaseController;
import com.shooot.application.api.ui.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiGetService {
    private final ApiRepository apiRepository;
    private final DomainRepository domainRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;
    private final ApiTestCaseRepository apiTestCaseRepository;
    private final ApiTestLogRepository apiTestLogRepository;

    @Transactional
    public List<ApiView> getApiList(Integer domainId){
        List<Api> apiList  = domainRepository.findByIdAndNotDeleted(domainId)
                .orElseThrow(DomainNotFoundException::new)
                .getApis();

        return apiList.stream()
                .filter(api -> !api.getIsDeleted())
                .map(ApiView::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApiDetailListView getApiWithTestCases(Integer apiId){
        Api api = apiRepository.findByIdAndNotDeleted(apiId)
                .orElseThrow(ApiNotFoundException::new);

        List<ApiTestCaseListView> testCaseRequestViews = getTestCases(api);
        ApiTestLastLogView apiTestLastLogView = getLastLog(api);

        return ApiDetailListView.builder()
                .requestDocs(ApiView.from(api))
                .testCases(testCaseRequestViews)
                .lastLog(apiTestLastLogView)
                .build();
    }

    private List<ApiTestCaseListView> getTestCases(Api api){
        List<ApiTestCase> apiTestCaseList = apiTestCaseRepository.findApiTestCasesByApiId(api.getId());

        return apiTestCaseList.stream()
                .map(ApiTestCaseListView::from)
                .collect(Collectors.toList());
    }

    private ApiTestLastLogView getLastLog(Api api){
//        List<ApiTestLog> apiTestLog = apiTestLogRepository.findLatestTestLogByApiId(api.getId());
//
//        if(apiTestLog.isEmpty()){
//            return null;
//        } else{
//            Pageable pageable = PageRequest.of(0, 1);
//            apiTestLog
//        }

        Pageable pageable = PageRequest.of(0, 1); // 첫 번째 페이지, 1개의 데이터만 가져오기
        List<ApiTestLog> logs = apiTestLogRepository.findLatestTestLogByApiId(api.getId(), pageable);

        return logs.isEmpty() ? null : ApiTestLastLogView.from(logs.get(0)); // 결과가 없으면 null 반환

//        return ApiTestLastLogView.from(apiTestLog);
    }

}
