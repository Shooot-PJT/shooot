package com.shooot.application.stresstest.subscriber;

import jakarta.annotation.PostConstruct;
import java.time.Duration;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.data.redis.stream.Subscription;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StressTestSubscriber implements
    StreamListener<String, MapRecord<String, String, String>> {

    private final StringRedisTemplate redisTemplate;
    private final Map<Integer, Subscription> subscriptions = new ConcurrentHashMap<>();
    private StreamMessageListenerContainer<String, MapRecord<String, String, String>> listenerContainer;

    @PostConstruct
    public void startListening() {
        StreamMessageListenerContainer.StreamMessageListenerContainerOptions<String, MapRecord<String, String, String>> options = StreamMessageListenerContainer.StreamMessageListenerContainerOptions.builder()
            .pollTimeout(Duration.ofMillis(500)).build();
        listenerContainer = StreamMessageListenerContainer.create(
            Objects.requireNonNull(redisTemplate.getConnectionFactory()), options);
        listenerContainer.start();
    }

    public void addSubscription(Integer projectId) {
        if (subscriptions.containsKey(projectId)) {
            return;
        }
        redisTemplate.opsForStream().trim("project_monitor_", 1000);
        Subscription subscription = listenerContainer.receive(
            StreamOffset.fromStart("project_monitor_" + projectId), this);
        subscriptions.put(projectId, subscription);
    }

    public void removeSubscription(Integer projectId) {
        redisTemplate.delete("project_monitor_" + projectId);
        Subscription remove = subscriptions.remove(projectId);
        listenerContainer.remove(remove);
    }

    @Override
    public void onMessage(MapRecord<String, String, String> message) {
    }
}
