package com.shooot.application.stresstest.service;

import com.shooot.application.api.domain.Api;
import com.shooot.application.projecttest.domain.repository.ProjectBuildRepository;
import com.shooot.application.projecttest.exception.TestExecutorNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StressTestService {

    private final ProjectBuildRepository projectBuildRepository;
    private final StressTestSseService stressTestSseService;
    private final ConcurrentHashMap<Integer, ExecutorService> executors = new ConcurrentHashMap<>();

    public void fixed(Integer id, String baseUrl, Api api, Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;

        ExecutorService executor = Executors.newFixedThreadPool(vUser);
        HttpRequestSender sender = new HttpRequestSender(baseUrl, api, endTime);

        for (int i = 0; i < vUser; i++) {
            executor.execute(sender);
        }
        executors.put(id, executor);
    }

    public void spike(Integer id, String baseUrl, Api api, Integer vUser, Integer duration) {
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
        executors.put(id, executor);
    }

    public void rampUp(Integer id, String baseUrl, Api api, Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / vUser;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(vUser);
        HttpRequestSender sender = new HttpRequestSender(baseUrl, api, endTime);

        for (int i = 0; i < vUser; i++) {
            executor.schedule(sender, interval * i, TimeUnit.MILLISECONDS);
        }
        executors.put(id, executor);
    }

    public void stop(Integer id) {
        if (!executors.containsKey(id)) {
            throw new TestExecutorNotFoundException();
        }
        ExecutorService executorService = executors.get(id);
        executorService.shutdownNow();
        executors.remove(id);
    }

    public void finish(Integer id) {
        executors.remove(id);
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
