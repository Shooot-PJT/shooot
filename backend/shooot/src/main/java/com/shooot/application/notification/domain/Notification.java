package com.shooot.application.notification.domain;

import com.shooot.application.common.jpa.BaseEntity;
import com.shooot.application.common.jpa.map.MapToJsonConverter;
import com.shooot.application.common.jpa.uuid.UUIDv7;
import com.shooot.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notification")
@Entity
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Convert(converter = MapToJsonConverter.class)
    @Column(name = "content")
    private Map<String, Object> content;

    @Column(name = "is_read")
    private Boolean isRead;

    @PrePersist
    private void setDefaults(){
        if(isRead == null){
            this.isRead = false;
        }
    }

}
