package com.shooot.application.api.service.query.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRequestRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.ui.dto.ApiDetailView;
import com.shooot.application.api.ui.dto.ApiTestCaseRequestView;
import com.shooot.application.api.ui.dto.ApiTestLastLogView;
import com.shooot.application.api.ui.dto.ApiView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApiGetService {
    private final ApiRepository apiRepository;
    private final DomainRepository domainRepository;
    private final ApiTestCaseRequestRepository apiTestCaseRequestRepository;

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
    public ApiView getApi(Integer apiId){
        Api api = apiRepository.findByIdAndNotDeleted(apiId)
                .orElseThrow(ApiNotFoundException::new);

        List<ApiTestCaseRequestView> testCaseRequestViews = getTestCases(api);

        ApiTestLastLogView apiTestLastLogView = getLastLog(api);

        return ApiView.from(api);
    }

    private List<ApiTestCaseRequestView> getTestCases(Api api){
        apiTestCaseRequestRepository.findRequestsByTestCaseId()



        return
    }

    private ApiTestLastLogView getLastLog(Api api){

    }





}
