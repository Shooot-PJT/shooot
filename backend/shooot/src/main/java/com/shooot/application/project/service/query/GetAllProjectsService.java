package com.shooot.application.project.service.query;

import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.ui.dto.ProjectView;
import com.shooot.application.user.domain.User;
import com.shooot.application.user.domain.UserRepository;
import com.shooot.application.user.exception.UserNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GetAllProjectsService {

    private final UserRepository userRepository;
    private final ProjectParticipantRepository projectParticipantRepository;
    private final ProjectRepository projectRepository;

    public List<ProjectView> getAllProjects(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<ProjectParticipant> participants = projectParticipantRepository.findByUser(user);
        return participants.stream()
            .map(participant -> ProjectView.from(participant.getProject()))
            .toList();
    }
}
