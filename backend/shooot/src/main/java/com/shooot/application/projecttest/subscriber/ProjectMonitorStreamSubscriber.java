package com.shooot.application.projecttest.subscriber;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.sseemitter.service.StressTestSseService;
import com.shooot.application.stresstest.controller.dto.StressTestDto;
import jakarta.annotation.PostConstruct;
import java.time.Duration;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.data.redis.stream.Subscription;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProjectMonitorStreamSubscriber implements
    StreamListener<String, MapRecord<String, String, String>> {

    private static final Logger log = LoggerFactory.getLogger(ProjectMonitorStreamSubscriber.class);
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final Map<Integer, Subscription> subscriptions = new ConcurrentHashMap<>();
    private final StressTestSseService stressTestSseService;
    private StreamMessageListenerContainer<String, MapRecord<String, String, String>> listenerContainer;

    @PostConstruct
    public void startListening() {
        StreamMessageListenerContainer.StreamMessageListenerContainerOptions<String, MapRecord<String, String, String>> options = StreamMessageListenerContainer.StreamMessageListenerContainerOptions.builder()
            .pollTimeout(Duration.ofMillis(500))
            .build();

        listenerContainer = StreamMessageListenerContainer.create(
            Objects.requireNonNull(redisTemplate.getConnectionFactory()), options);
        listenerContainer.start();
    }

    public void addSubscriptionForProject(Integer projectId) {
        if (subscriptions.containsKey(projectId)) {
            return;
        }
        redisTemplate.opsForStream().trim("project_monitor_", 1000);
        Subscription subscription = listenerContainer.receive(
            StreamOffset.fromStart("project_monitor_" + projectId), this);

        subscriptions.put(projectId, subscription);
        log.info("Subscribed to project monitor stream : {}", projectId);
    }

    public void removeSubscriptionForProject(Integer projectId) {
        redisTemplate.delete("project_monitor_" + projectId);
        Subscription remove = subscriptions.remove(projectId);
        listenerContainer.remove(remove);
    }

    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        try {
            String jsonMessage = message.getValue().get("message");
            Map<String, Object> map = objectMapper.readValue(jsonMessage, Map.class);
            System.out.println(System.currentTimeMillis());

            Integer projectJarFileId = (Integer) map.get("projectJarFileId");
            System.out.println(projectJarFileId);

            Double cpu = (Double) map.get("cpu");
            Double memory = (Double) map.get("memory");
            Double disk = (Double) map.get("disk");
            Double network = (Double) map.get("network");
            String method = map.get("method").toString();
            String url = map.get("url").toString();

            stressTestSseService.send(
                projectJarFileId,
                StressTestDto.builder()
                    .cpu(cpu)
                    .memory(memory)
                    .disk(disk)
                    .network(network)
                    .method(method)
                    .url(url)
                    .build()
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
