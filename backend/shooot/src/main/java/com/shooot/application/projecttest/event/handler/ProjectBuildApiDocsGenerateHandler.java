package com.shooot.application.projecttest.event.handler;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.projecttest.domain.BuildFileApiDocs;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.repository.ApiTestMethodRepository;
import com.shooot.application.projecttest.domain.repository.BuildFileApiDocsRepository;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.event.dto.ProjectBuildUploadedEvent;
import com.shooot.application.projecttest.handler.ApiInfoDto;
import com.shooot.application.projecttest.handler.ApiInfoExtractor;
import com.shooot.application.projecttest.handler.CustomClassLoader;
import com.shooot.application.utils.FileHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.lang.reflect.Method;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.shooot.application.projecttest.handler.ApiInfoExtractor.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class ProjectBuildApiDocsGenerateHandler {
    private final BuildFileApiDocsRepository buildFileApiDocsRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private final ApiRepository apiRepository;
    private final ApiTestMethodRepository apiTestMethodRepository;


    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void buildFileApiDocs(ProjectBuildUploadedEvent projectBuildUploadedEvent) {
        //TODO : 명시적 락 필요 (락이 걸려있음을 프론트엔드에게 알려야 함.)
        CustomClassLoader customClassLoader = new CustomClassLoader(new URL[0], this.getClass().getClassLoader());

        ProjectBuild projectBuild = projectBuildRepository.getReferenceById(projectBuildUploadedEvent.getProjectBuildId());
        try {
            Map<String, List<Class<?>>> stringListMap = customClassLoader.loadAllClassesFromNestedJar(projectBuildUploadedEvent.getJarFile());
            List<ApiInfoDto> endPoints = extractApiInfo(stringListMap);
            log.info("api length : {}", endPoints.size());
            for(ApiInfoDto apiInfoDto : endPoints) {
                log.info("api info : {}", apiInfoDto);
            }
            List<Api> apis = apiRepository.findAllByDomain_Project_Id(projectBuild.getProject().getId());
            // TODO : API Repository 추가되었을 때 작성할 것.
            List<BuildFileApiDocs> list = endPoints.stream().map(endPoint ->{
                    Api it = apis.stream().filter(api -> Objects.equals(api.getUrl(), endPoint) && Objects.equals(api.getMethod(), endPoint.getMethod())).findFirst().orElseGet(() -> null);
                    return BuildFileApiDocs.create(it, endPoint, projectBuild);
                }
            ).collect(Collectors.toList());



            buildFileApiDocsRepository.saveAll(list);
            projectBuildUploadedEvent.getJarFile().delete();


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

