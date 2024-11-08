package com.shooot.application.projecttest.event.handler;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.repository.ApiRepository;
import com.shooot.application.projecttest.event.dto.ProjectTestRequestedEvent;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Component
public class ProjectStressTestHandler {

    private final ApiRepository apiRepository;
    private final WebClient webClient;

    private static boolean IS_INTERRUPTED = false;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void stressTest(ProjectTestRequestedEvent event) {

        Api api = Api.builder()
            .method("GET")
            .url("http://khj745700.iptime.org:22222/")
            .build();
        ExecutorService executorService = Executors.newFixedThreadPool(10);

        SendRequest sendRequest = new SendRequest(api, 0);

        IS_INTERRUPTED = false;

        for (int i = 0; i < 10; i++) {
            executorService.execute(sendRequest);
        }

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        IS_INTERRUPTED = true;
    }

    @AllArgsConstructor
    private class SendRequest implements Runnable {

        private Api api;
        private Integer count = 0;

        @Override
        public void run() {
            while (!IS_INTERRUPTED) {
                webClient.method(HttpMethod.valueOf(api.getMethod()))
                    .uri(api.getUrl()).retrieve()
                    .bodyToMono(String.class)
                    .block();
                System.out.println(count++);
            }
        }
    }
}
