package com.shooot.application.project.domain;

import com.shooot.application.common.jpa.SoftDeleteEntity;
import com.shooot.application.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_participant")
@Entity
@SQLRestriction("is_deleted = false")
public class ProjectParticipant extends SoftDeleteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_participant_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_owner")
    private Boolean isOwner;

    // todo : 추후에 업데이트 있으면 dto로 변경해주기
    // 지금은 하나밖에 없어서 최대한 안건드릴려고 이렇게 작성함
    public void update(User user) {
        this.user = user;
    }
}
