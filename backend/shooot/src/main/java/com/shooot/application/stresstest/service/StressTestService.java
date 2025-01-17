package com.shooot.application.stresstest.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.api.domain.Api;
import com.shooot.application.projecttest.domain.ProjectBuild;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.sseemitter.service.StressTestSseService;
import com.shooot.application.stresstest.controller.dto.StressTestDto;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class StressTestService {

    private final ProjectBuildRepository projectBuildRepository;
    private final StressTestSseService stressTestSseService;

    public void fixed(String baseUrl, Api api, Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;

        ExecutorService executor = Executors.newFixedThreadPool(vUser);
        HttpRequestSender sender = new HttpRequestSender(baseUrl, api, endTime);

        for (int i = 0; i < vUser; i++) {
            executor.execute(sender);
        }
    }

    public void spike(String baseUrl, Api api, Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / 2;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(vUser);
        HttpRequestSender baseSender = new HttpRequestSender(baseUrl, api, endTime);
        HttpRequestSender spikeSender = new HttpRequestSender(baseUrl, api,
            currentTime + interval + 1000);

        executor.schedule(baseSender, 0, TimeUnit.MILLISECONDS);
        for (int i = 0; i < vUser - 1; i++) {
            executor.schedule(spikeSender, interval, TimeUnit.MILLISECONDS);
        }
    }

    public void rampUp(String baseUrl, Api api, Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / vUser;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(vUser);
        HttpRequestSender sender = new HttpRequestSender(baseUrl, api, endTime);

        for (int i = 0; i < vUser; i++) {
            executor.schedule(sender, interval * i, TimeUnit.MILLISECONDS);
        }
    }

    @Transactional
    public StressTestDto getData(Integer projectJarFileId) {
        ProjectBuild projectBuild = projectBuildRepository.findById(projectJarFileId).orElseThrow();

        return StressTestDto.builder()
            .cpuUtilization(getCpuUtilization(projectBuild.getProject().getEnglishName()))
            .ramUtilization(getRamUtilization(projectBuild.getProject().getEnglishName()))
            .build();
    }

    private float getCpuUtilization(String subDomain) {
        try {
            URL url = new URL(
                "https://%s.shooot.shop/actuator/metrics/process.cpu.usage".formatted(subDomain));
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/json");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> responseMap = objectMapper.readValue(content.toString(),
                Map.class);
            List<Map<String, Object>> measurements = (List<Map<String, Object>>) responseMap.get(
                "measurements");
            double doubleValue = (double) measurements.get(0).get("value");
            float value = (float) doubleValue;
            connection.disconnect();
            return value;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private float getRamUtilization(String subDomain) {
        try {
            URL url = new URL(
                "https://%s.shooot.shop/actuator/metrics/jvm.memory.used".formatted(subDomain));
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/json");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> responseMap = objectMapper.readValue(content.toString(),
                Map.class);
            List<Map<String, Object>> measurements = (List<Map<String, Object>>) responseMap.get(
                "measurements");
            double doubleValue = (double) measurements.get(0).get("value");
            float value = (float) doubleValue;
            connection.disconnect();
            return value;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @AllArgsConstructor
    private static class HttpRequestSender implements Runnable {

        private String baseUrl;
        private Api api;
        private long end;

        @Override
        public void run() {
            while (System.currentTimeMillis() < end) {
                try {
                    URL obj = new URL(baseUrl + api.getUrl());
                    HttpURLConnection connection = (HttpURLConnection) obj.openConnection();
                    connection.setRequestMethod("GET");
                    connection.getResponseCode();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                try {
                    Thread.sleep(1);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
