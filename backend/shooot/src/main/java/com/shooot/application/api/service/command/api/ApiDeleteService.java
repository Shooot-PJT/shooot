package com.shooot.application.api.service.command.api;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiDeleteService {
    private final ApiRepository apiRepository;

    public void deleteApi(Integer apiId){
        Api api = apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);

        api.delete();
    }
}
