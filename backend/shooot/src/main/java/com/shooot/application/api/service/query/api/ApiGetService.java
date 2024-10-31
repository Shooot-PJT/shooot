package com.shooot.application.api.service.query.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.ui.dto.ApiView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApiGetService {
    private final ApiRepository apiRepository;
    private final DomainRepository domainRepository;

    public List<ApiView> getApiList(Integer domainId){
        List<Api> apiList  = domainRepository.findByIdAndNotDeleted(domainId)
                .orElseThrow(DomainNotFoundException::new)
                .getApis();

        return apiList.stream()
                .map(ApiView::from)
                .collect(Collectors.toList());
    }

    public ApiView getApi(Integer apiId){
        Api api = apiRepository.findByIdAndNotDeleted(apiId)
                .orElseThrow(ApiNotFoundException::new);

        return ApiView.from(api);
    }





}
