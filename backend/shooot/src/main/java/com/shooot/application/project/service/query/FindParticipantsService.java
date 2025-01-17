package com.shooot.application.project.service.query;

import com.shooot.application.project.domain.Project;
import com.shooot.application.project.domain.ProjectParticipant;
import com.shooot.application.project.domain.repository.ProjectParticipantRepository;
import com.shooot.application.project.domain.repository.ProjectRepository;
import com.shooot.application.project.exception.ProjectNotParticipantException;
import com.shooot.application.project.ui.dto.FindParticipantsResponse;
import java.util.List;

import com.shooot.application.project.ui.dto.ProjectParticipantMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class FindParticipantsService {

    private final ProjectRepository projectRepository;
    private final ProjectParticipantRepository projectParticipantRepository;

    @Transactional(readOnly = true)
    public List<FindParticipantsResponse> findParticipants(Integer projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        List<ProjectParticipant> projectParticipants = projectParticipantRepository.findByProject(
            project);
        return projectParticipants.stream().map(ProjectParticipant::getUser).map(
            FindParticipantsResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public Integer findParticipantId(Integer projectId, Integer userId){
        ProjectParticipant projectParticipant = projectParticipantRepository.findByProjectIdAndUserId(projectId, userId);

        if(projectParticipant == null) throw new ProjectNotParticipantException();

        return projectParticipant.getId();
    }

    @Transactional(readOnly = true)
    public List<ProjectParticipantMember> findParticipantList(Integer projectId){
        List<ProjectParticipant> projectParticipantList = projectParticipantRepository.findByProjectIdMembers(projectId);

        return projectParticipantList
                .stream()
                .map(ProjectParticipantMember::from)
                .toList();
    }
}
