package com.shooot.application.projecttest.handler;

import com.shooot.application.projecttest.exception.DockerComposeCanNotUseImageException;
import com.shooot.application.projecttest.exception.DockerComposeCanNotUsePortException;
import com.shooot.application.projecttest.exception.DockerComposeCanNotUseVolumeException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;


@Component
@Slf4j
public class DockerComposeValidator {

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

    public void validateComposeFile(String composeFilePath) {
        Yaml yaml = new Yaml();
        try (InputStream inputStream = new FileInputStream(composeFilePath)) {
            Map<String, Object> composeFile = yaml.load(inputStream);

            // 최상위 networks 검증
            Map<String, Object> networks = (Map<String, Object>) composeFile.get("networks");
            if (networks != null && !networks.isEmpty()) {
                log.info("The compose file should not define any top-level networks.");
                throw new DockerComposeCanNotUseImageException();
            }

            // services 검증
            Map<String, Object> services = (Map<String, Object>) composeFile.get("services");
            for (Map.Entry<String, Object> serviceEntry : services.entrySet()) {
                Map<String, Object> service = (Map<String, Object>) serviceEntry.getValue();

                // 1. 네임스페이스 및 공식 레포지토리 검증
                String image = (String) service.get("image");
                if (image != null) {
                    String[] imageParts = image.split("/");
                    if (imageParts.length > 1 && !imageParts[0].equals("library")) {
                        log.info("Service {} uses a non-official Docker image with namespace: {}", serviceEntry.getKey(), imageParts[0]);
                        throw new DockerComposeCanNotUseImageException();
                    }

                    String imageNameWithTag = imageParts.length == 2 ? imageParts[1] : imageParts[0];
                    String[] nameTagParts = imageNameWithTag.split(":");
                    String imageName = nameTagParts[0];
                    String tag = nameTagParts.length > 1 ? nameTagParts[1] : "latest";

                    if (!isImageWithTagInOfficialRegistry(imageName, tag)) {
                        log.info("Service {} does not use an official Docker image with tag: library/{}:{}", serviceEntry.getKey(), imageName, tag);
                        throw new DockerComposeCanNotUseImageException();
                    }
                }else {
                    log.info("Can not use project Image");
                    throw new DockerComposeCanNotUseImageException();
                }

                // 2. 서비스 내부 네트워크 설정이 없는지 검증
                List<String> serviceNetworks = (List<String>) service.get("networks");
                if (serviceNetworks != null && !serviceNetworks.isEmpty()) {
                    log.info("Service {} should not be connected to any networks.", serviceEntry.getKey());
                    throw new DockerComposeCanNotUseImageException();
                }

                // 3. 포트 포워딩 설정이 없는지 검증
                List<String> ports = (List<String>) service.get("ports");
                if (ports != null && !ports.isEmpty()) {
                    log.info("Service {} should not have any ports forwarded.", serviceEntry.getKey());
                    throw new DockerComposeCanNotUsePortException();
                }

                // 4. 볼륨 설정이 없는지 검증
                List<String> volumes = (List<String>) service.get("volumes");
                if (volumes != null && !volumes.isEmpty()) {
                    log.info("Service {} should not have any volumes attached.", serviceEntry.getKey());
                    throw new DockerComposeCanNotUseVolumeException();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
