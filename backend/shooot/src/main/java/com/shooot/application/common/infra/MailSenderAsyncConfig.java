package com.shooot.application.common.infra;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Slf4j
@EnableAsync
@Configuration
public class MailSenderAsyncConfig {

    @Bean(name = "mailExecutor")
    public Executor threadPoolTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        int processors = Runtime.getRuntime().availableProcessors();
        log.info("processors: {}", processors);

        executor.setThreadNamePrefix("send-request-mail-");
        executor.setCorePoolSize(processors / 4);
        executor.setMaxPoolSize(processors / 2);
        executor.setQueueCapacity(10); // 최대 큐 수
        executor.setKeepAliveSeconds(60); // 큐 속에 들어가지 못한 데이터는 60초 후에 삭제
        executor.initialize();

        return executor;
    }
}
