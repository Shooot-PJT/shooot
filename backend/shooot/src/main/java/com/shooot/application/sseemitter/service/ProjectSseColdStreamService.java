package com.shooot.application.sseemitter.service;

import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.exception.ProjectParticipantNotFoundException;
import com.shooot.application.projecttest.subscriber.ConsoleLogStreamSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
public class ProjectSseColdStreamService {
    private final ConsoleLogStreamSubscriber consoleLogStreamSubscriber;
    private final ProjectParticipantRepository projectParticipantRepository;

    public SseEmitter subscribe(Integer projectId, Integer userId) {
        ProjectParticipant pp = projectParticipantRepository.findByProjectIdAndUserId(projectId, userId);

        if( pp == null ) {
            throw new ProjectParticipantNotFoundException();
        }

        SseEmitter emitter = consoleLogStreamSubscriber.addEmitter(projectId, pp.getId());
        return emitter;
    }

}
