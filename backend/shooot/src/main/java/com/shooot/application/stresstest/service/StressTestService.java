package com.shooot.application.stresstest.service;

import com.shooot.application.api.domain.Api;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicIntegerArray;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Service
public class StressTestService {

    private final WebClient webClient;
    private AtomicIntegerArray array;
    private Api api = Api.builder()
        .method("GET")
        .url("https://pichu.shooot.shop/hello")
        .build();

    public void fixed(Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;

        ExecutorService executor = Executors.newFixedThreadPool(vUser);
        HttpRequestSender sender = new HttpRequestSender(api, endTime);

        for (int i = 0; i < vUser; i++) {
            executor.execute(sender);
        }
    }

    public void spike(Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / 2;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(vUser);
        HttpRequestSender baseSender = new HttpRequestSender(api, endTime);
        HttpRequestSender spikeSender = new HttpRequestSender(api, currentTime + interval + 1000);

        executor.schedule(baseSender, 0, TimeUnit.MILLISECONDS);
        for (int i = 0; i < vUser - 1; i++) {
            executor.schedule(spikeSender, interval, TimeUnit.MILLISECONDS);
        }
    }

    public void rampUp(Integer vUser, Integer duration) {
        long currentTime = System.currentTimeMillis();
        long endTime = currentTime + duration * 1000;
        long interval = duration * 1000 / vUser;

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(vUser);
        HttpRequestSender sender = new HttpRequestSender(api, endTime);

        for (int i = 0; i < vUser; i++) {
            executor.schedule(sender, interval * i, TimeUnit.MILLISECONDS);
        }
    }

    @AllArgsConstructor
    private static class HttpRequestSender implements Runnable {

        private Api api;
        private long end;

        @Override
        public void run() {
            while (System.currentTimeMillis() < end) {
                try {
                    URL obj = new URL(api.getUrl());
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
