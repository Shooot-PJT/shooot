package com.shooot.application.projecttest.handler;

import com.shooot.application.projecttest.exception.DockerComposeCanNotUseImageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.LoaderOptions;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;


@Component
@Slf4j
public class DockerComposeValidator {

    public void canUse(File file) {
        Yaml yaml = new Yaml();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(file.getAbsolutePath())) {
            Map<String, Object> composeFile = yaml.load(inputStream);
            Map<String, Object> services = (Map<String, Object>) composeFile.get("services");

            for (Map.Entry<String, Object> serviceEntry : services.entrySet()) {
                Map<String, Object> service = (Map<String, Object>) serviceEntry.getValue();
                String image = (String) service.get("image");

                if (image != null) {
                    // 네임스페이스와 이미지 이름, 태그 분리
                    String[] imageParts = image.split("/");
                    if (imageParts.length > 1 && !imageParts[0].equals("library")) {
                        log.info("Service {} uses a non-official Docker image with namespace: {}", serviceEntry.getKey(), imageParts[0]);
                        throw new DockerComposeCanNotUseImageException();

                    }

                    String imageNameWithTag = imageParts.length == 2 ? imageParts[1] : imageParts[0];
                    String[] nameTagParts = imageNameWithTag.split(":");
                    String imageName = nameTagParts[0];
                    String tag = nameTagParts.length > 1 ? nameTagParts[1] : "latest"; // 태그가 없으면 'latest'로 간주

                    if (isImageWithTagInOfficialRegistry(imageName, tag)) {
                        log.info("Service {} uses an official Docker image with tag: library/{}:{}", serviceEntry.getKey(), imageName, tag);
                    } else {
                        log.info("Service {} does not use an official Docker image with tag: library/{}:{}", serviceEntry.getKey(), imageName, tag);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public boolean isImageWithTagInOfficialRegistry(String imageName, String tag) {
        try {
            String urlString = String.format("https://registry.hub.docker.com/v2/repositories/library/%s/tags/%s",
                    imageName, tag);
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            int responseCode = conn.getResponseCode();
            return responseCode == 200;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
