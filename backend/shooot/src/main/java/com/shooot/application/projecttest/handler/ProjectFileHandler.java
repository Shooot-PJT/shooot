package com.shooot.application.projecttest.handler;

import com.shooot.application.projecttest.domain.ProjectVersion;

import java.io.*;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.jar.Attributes;
import java.util.jar.JarFile;
import java.util.jar.JarInputStream;
import java.util.jar.Manifest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;


public final class ProjectFileHandler {

    public static final String PROJECT_NAME = "projectName";
    public static final String VERSION = "version";

    public static Manifest readManifest(String sourceJARFile) throws IOException
    {
        ZipFile zipFile = new ZipFile(sourceJARFile);
        Enumeration entries = zipFile.entries();

        while (entries.hasMoreElements())
        {
            ZipEntry zipEntry = (ZipEntry) entries.nextElement();
            if (zipEntry.getName().equals("META-INF/MANIFEST.MF"))
            {
                return new Manifest(zipFile.getInputStream(zipEntry));
            }
        }

        throw new IllegalStateException("Manifest not found");
    }

    private static String toString(InputStream inputStream) throws IOException
    {
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream)))
        {
            String line;
            while ((line = bufferedReader.readLine()) != null)
            {
                stringBuilder.append(line);
                stringBuilder.append(System.lineSeparator());
            }
        }

        return stringBuilder.toString().trim() + System.lineSeparator();
    }

    public static Map<String, Object> extractJarInfo(String jarFilePath) throws IOException {
        // META-INF/MANIFEST.MF 파일 추출
        Manifest manifest = readManifest(jarFilePath);
        System.out.println("manifest = " + manifest);
        System.out.println("manifest.getMainAttributes().toString() = " + manifest.getMainAttributes().keySet());
        if (manifest == null) {
            System.out.println("MANIFEST.MF 파일을 찾을 수 없습니다.");
            throw new FileNotFoundException();
        }

        Map<String, Object> infos = new HashMap<>();

        // Manifest 내용을 읽어들여 정규 표현식 적용
        for(Map.Entry<String, Attributes> info : manifest.getEntries().entrySet()) {
            System.out.println("info.getValue() = " + info.getValue());
        }
        // 프로젝트 이름 추출
        String projectName = manifest.getMainAttributes().getValue("Implementation-Title");
        System.out.println("프로젝트 이름: " + (projectName != null ? projectName : "찾을 수 없음"));

        infos.put(PROJECT_NAME, projectName);

        // 버전 정보 추출
        String version =  manifest.getMainAttributes().getValue("Implementation-Version");
        System.out.println("버전: " + (version != null ? version : "찾을 수 없음"));
        version = version.replace("SNAPSHOT", "");
        version = version.replaceAll("-", "");
        String[] versionSplit = version.split("\\.");
        ProjectVersion projectVersion = new ProjectVersion(Integer.parseInt(versionSplit[0]), Integer.parseInt(versionSplit[1]), Integer.parseInt(versionSplit[2]), null);

        infos.put(VERSION, projectVersion);

        return infos;
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
