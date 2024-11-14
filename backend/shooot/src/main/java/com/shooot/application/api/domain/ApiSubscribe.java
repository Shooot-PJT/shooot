package com.shooot.application.api.domain;

import com.shooot.application.project.domain.ProjectParticipant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_subscribe")
@Entity
public class ApiSubscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_subscribe_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_participant_id")
    private ProjectParticipant projectParticipant;
}
