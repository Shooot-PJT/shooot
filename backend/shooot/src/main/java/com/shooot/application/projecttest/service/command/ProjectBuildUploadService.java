package com.shooot.application.projecttest.service.command;

import com.shooot.application.projecttest.domain.repository.BuildFileApiDocsRepository;
import com.shooot.application.projecttest.handler.ApiInfoExtractor;
import com.shooot.application.projecttest.handler.CustomClassLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.shooot.application.projecttest.handler.ApiInfoExtractor.*;

@RequiredArgsConstructor
@Service
public class ProjectBuildUploadService {
    private final BuildFileApiDocsRepository buildFileApiDocsRepository;

    public void buildFileApiExtractor(MultipartFile multipartFile) {

        //TODO : 파일 업로드 시 프로젝트 팀원도 받도록 함. 현재는 그냥 진행.
        CustomClassLoader customClassLoader = new CustomClassLoader(new URL[0], this.getClass().getClassLoader());


        try {
            Map<String, List<Class<?>>> stringListMap = customClassLoader.loadAllClassesFromNestedJar(fileConverter(multipartFile));
            List<Class<?>> controllerClasses = extractApiInfo(stringListMap);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    private File fileConverter(MultipartFile multipartFile) throws IOException {
        return convert(multipartFile) .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
    }
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

}
