package com.shooot.application.api.domain.interceptor;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.Domain;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.api.domain.repository.ApiTestCaseRepository;
import com.shooot.application.api.domain.repository.DomainRepository;
import com.shooot.application.api.exception.api.ApiNotFoundException;
import com.shooot.application.api.exception.domain.DomainNotFoundException;
import com.shooot.application.api.exception.testcase.TestCaseNotFoundException;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.exception.ProjectPermissionDeniedException;
import com.shooot.application.security.service.UserLoginContext;
import com.shooot.application.user.exception.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.security.auth.login.LoginException;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class ParticipantCheckInterceptor implements HandlerInterceptor {
    private final ProjectParticipantRepository projectParticipantRepository;
    private final DomainRepository domainRepository;
    private final ApiRepository apiRepository;
    private final ApiTestCaseRepository testCaseRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(handler instanceof HandlerMethod){
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            RequiresProjectParticipation requiresProjectParticipation = handlerMethod.getMethodAnnotation(RequiresProjectParticipation.class);

            if(requiresProjectParticipation == null){
                return true;
            }

            if(SecurityContextHolder.getContext().getAuthentication() == null) throw new UserNotFoundException();

            Integer userId = ((UserLoginContext) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();

            Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
            Integer projectId = -1;
            Integer domainId = -1;
            Integer apiId = -1;


            if (pathVariables != null) {
                projectId = Integer.parseInt(pathVariables.get("projectId"));
                domainId = Integer.parseInt(pathVariables.get("domainId"));
                apiId = Integer.parseInt(pathVariables.get("apiId"));

                log.info("pathVariable projectId = {}, domainId = {}, apiId = {}", projectId, domainId, apiId);
            }


            boolean hasAccess = false;
            switch(requiresProjectParticipation.type()){
                case DOMAIN -> isDomainParticipantProject(userId, domainId);
                case API -> isApiParticipantProject(userId, apiId);
                case PROJECT -> isTestCaseParticipantProject(userId, projectId);
            }

            if(!hasAccess) throw new ProjectPermissionDeniedException();


        }

        return true;
    }


    private boolean isDomainParticipantProject(Integer userId, Integer domainId){
        Domain domain = domainRepository.findById(domainId)
                .orElseThrow(DomainNotFoundException::new);

        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectIdAndUserId(domain.getProject().getId(), userId);

        return projectParticipant != null;

    }

    private boolean isApiParticipantProject(Integer userId, Integer apiId){
        Api api = apiRepository.findById(apiId)
                .orElseThrow(ApiNotFoundException::new);

        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectIdAndUserId(api.getDomain().getProject().getId(), userId);

        return projectParticipant != null;
    }

    private boolean isTestCaseParticipantProject(Integer userId, Integer testcaseId){
        ApiTestCase testCase = testCaseRepository.findById(testcaseId)
                .orElseThrow(TestCaseNotFoundException::new);

        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectIdAndUserId(testCase.getApi().getDomain().getProject().getId(), userId);

        return projectParticipant != null;
    }
}
