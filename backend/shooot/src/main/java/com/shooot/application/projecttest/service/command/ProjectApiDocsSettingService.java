package com.shooot.application.projecttest.service.command;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.projecttest.controller.dto.ProjectApiDocsForTestView;
import com.shooot.application.projecttest.domain.ApiTestMethod;
import com.shooot.application.projecttest.domain.BuildFileApiDocs;
import com.shooot.application.projecttest.domain.BuildFileTestMethod;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.repository.ApiTestMethodRepository;
import com.shooot.application.projecttest.domain.repository.BuildFileApiDocsRepository;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.exception.FileIsNotExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ProjectApiDocsSettingService {
    private final BuildFileApiDocsRepository buildFileApiDocsRepository;
    private final ProjectBuildRepository projectBuildRepository;
    private final ApiRepository apiRepository;
    private final ApiTestMethodRepository apiTestMethodRepository;

    @Transactional
    public ProjectApiDocsForTestView forTestInfo(Integer projectJarFileId) {
        ProjectBuild projectBuild = projectBuildRepository.findById(projectJarFileId).orElseThrow(FileIsNotExistException::new);
        List<BuildFileApiDocs> buildFileApiDocsList = buildFileApiDocsRepository.findAllByProjectBuild_Id(projectJarFileId);
        List<Api> allByDomainProjectId = apiRepository.findAllByDomain_Project_Id(projectBuild.getProject().getId());

        List<ApiTestMethod> apiTestMethods = apiTestMethodRepository.findAllByApiIn(allByDomainProjectId);
        List<ApiTestMethod> newApiTestMethods = new ArrayList<>();

        ProjectApiDocsForTestView view = new ProjectApiDocsForTestView();


        buildFileApiDocsList.stream().forEach(buildFileApiDocs -> {
            buildFileApiDocs.updateApi(allByDomainProjectId.stream().filter(api -> Objects.equals(api.getUrl(), buildFileApiDocs.getUrl()) && Objects.equals(api.getMethod(), buildFileApiDocs.getMethod())).findFirst().orElseGet(()-> null));
            if (buildFileApiDocs.getApi() == null) {
                view.putExclude(ProjectApiDocsForTestView.Exclude.builder().endPoint(buildFileApiDocs.getUrl()).method(buildFileApiDocs.getApi().getMethod()).build());
            } else {
                view.putInclude(new ProjectApiDocsForTestView.Include(
                        apiTestMethods.stream().filter(apiTestMethod -> apiTestMethod.getApi().getId().equals(buildFileApiDocs.getApi().getId())).findFirst().orElseGet(() -> {
                            ApiTestMethod newApiTestMethod = ApiTestMethod.builder().api(buildFileApiDocs.getApi()).vUsers(10).testDuration(1).buildFileTestMethod(BuildFileTestMethod.FIXED).build();
                            newApiTestMethods.add(newApiTestMethod);
                            return newApiTestMethod;
                        })));
            }
        });

        if(!newApiTestMethods.isEmpty())
            apiTestMethodRepository.saveAll(newApiTestMethods);

        return view;
    }
}
