package com.shooot.dockermanager.service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
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
public class HttpRequestSenderService {

    private final Map<Integer, ExecutorService> isRunning = new ConcurrentHashMap<>();

    public void fixed(Integer projectJarFileId, String urlWithHost, Integer numberOfThreads,
        Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;

        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);
        HttpRequestSender requestSender = new HttpRequestSender(endTime, urlWithHost);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.execute(requestSender);
        }

        isRunning.put(projectJarFileId, executor);
    }

    public void spike(Integer projectJarFileId, String urlWithHost, Integer numberOfThreads,
        Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / 2;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(numberOfThreads);
        HttpRequestSender baseSender = new HttpRequestSender(endTime, urlWithHost);
        HttpRequestSender spikeSender = new HttpRequestSender(currentTime + interval + 1000,
            urlWithHost);

        executor.schedule(baseSender, 0, TimeUnit.MILLISECONDS);
        for (int i = 0; i < numberOfThreads - 1; i++) {
            executor.schedule(spikeSender, interval, TimeUnit.MILLISECONDS);
        }

        isRunning.put(projectJarFileId, executor);
    }

    public void rampUp(Integer projectJarFileId, String urlWithHost, Integer numberOfThreads,
        Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / numberOfThreads;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(numberOfThreads);
        HttpRequestSender requestSender = new HttpRequestSender(endTime, urlWithHost);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.schedule(requestSender, interval * i, TimeUnit.MILLISECONDS);
        }

        isRunning.put(projectJarFileId, executor);
    }

    public void stop(Integer projectJarFileId) {
        ExecutorService executorService = isRunning.get(projectJarFileId);
        executorService.shutdownNow();
        isRunning.remove(projectJarFileId);
    }

    @AllArgsConstructor
    private static class HttpRequestSender implements Runnable {

        private long endTime;
        private String requestUrl;

        @Override
        public void run() {
            while (System.currentTimeMillis() < endTime) {
                try {
                    URL url = new URL(requestUrl);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.getResponseCode();
                    Thread.sleep(1);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
