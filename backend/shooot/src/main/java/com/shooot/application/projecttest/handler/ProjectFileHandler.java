package com.shooot.application.projecttest.handler;

import com.shooot.application.projecttest.domain.ProjectVersion;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.jar.JarFile;
import java.util.jar.Manifest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public final class ProjectFileHandler {

    // 정규 표현식을 통해 Project Name과 Version을 추출
    private static final Pattern VERSION_PATTERN =
            Pattern.compile("Implementation-Version: (.+)");
    private static final Pattern NAME_PATTERN =
            Pattern.compile("Implementation-Title: (.+)");

    public static final String PROJECT_NAME = "projectName";
    public static final String VERSION = "version";

    public static Map<String, Object> extractJarInfo(String jarFilePath) throws IOException {
        try (JarFile jarFile = new JarFile(jarFilePath)) {
            // META-INF/MANIFEST.MF 파일 추출
            Manifest manifest = jarFile.getManifest();
            if (manifest == null) {
                System.out.println("MANIFEST.MF 파일을 찾을 수 없습니다.");
                throw new FileNotFoundException();

            }

            Map<String, Object> infos = new HashMap<>();

            // Manifest 내용을 읽어들여 정규 표현식 적용
            String manifestContent = manifest.getMainAttributes().toString();

            // 프로젝트 이름 추출
            String projectName = extractWithPattern(NAME_PATTERN, manifestContent);
            System.out.println("프로젝트 이름: " + (projectName != null ? projectName : "찾을 수 없음"));

            infos.put(PROJECT_NAME, projectName);

            // 버전 정보 추출
            String version = extractWithPattern(VERSION_PATTERN, manifestContent);
            System.out.println("버전: " + (version != null ? version : "찾을 수 없음"));

            String[] versionSplit = version.split(".");
            ProjectVersion projectVersion = new ProjectVersion(Integer.parseInt(versionSplit[0]), Integer.parseInt(versionSplit[1]), Integer.parseInt(versionSplit[2]), null);

            infos.put(VERSION, projectVersion);

            return infos;
        }
    }

    // 정규 표현식 패턴을 이용해 문자열을 추출하는 메소드
    private static String extractWithPattern(Pattern pattern, String content) {
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}
