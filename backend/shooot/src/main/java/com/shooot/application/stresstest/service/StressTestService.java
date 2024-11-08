package com.shooot.application.stresstest.service;

import com.shooot.application.api.domain.Api;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Service
public class StressTestService {

    private final WebClient webClient;

    private static boolean IS_INTURRUPTED = false;

//    public void stressTest(Integer vuserNum, Integer duration, String method) {
//
//        Api api = Api.builder()
//            .method("GET")
//            .url("http://khj745700.iptime.org:22222/")
//            .build();
//
//        AtomicInteger counter = new AtomicInteger();
//
//        HttpRequestSender httpRequestSender = new HttpRequestSender(api, counter);
//
//        ExecutorService executorService = Executors.newFixedThreadPool(vuserNum);
//
//        IS_INTURRUPTED = false;
//
//        for (int i = 0; i < vuserNum; i++) {
//            executorService.execute(httpRequestSender);
//        }
//
//        try {
//            Thread.sleep(duration * 60 * 1000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        IS_INTURRUPTED = true;
//
//        System.out.println(counter.get());
//    }

    public void spike(Integer vuserNum, Integer duration) {
        Api api = Api.builder()
            .method("GET")
            .url("http://khj745700.iptime.org:22222/")
            .build();
        long currentTime = System.currentTimeMillis();
        long end = currentTime + duration * 1000;

        long mid = duration * 1000 / 2; // ms
        long delay = mid / vuserNum;
        HttpRequestSender httpRequestSender = new HttpRequestSender(end, api);

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(vuserNum);
        for (int i = 0; i < vuserNum; i++) {
            executorService.schedule(httpRequestSender, delay * i, TimeUnit.MILLISECONDS);
        }
    }

    @AllArgsConstructor
    private class HttpRequestSender implements Runnable {

        private long end;
        private Api api;

        @Override
        public void run() {
            while (System.currentTimeMillis() < end) {
                String result = webClient.method(HttpMethod.valueOf(api.getMethod()))
                    .uri(api.getUrl())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
                System.out.println(result);
            }
        }
    }
}
