package com.shooot.application.notification.ui.dto;

import com.shooot.application.common.jpa.map.MapToJsonConverter;
import jakarta.persistence.Convert;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationView {
    private UUID id;
    private Boolean isRead;
    private LocalDateTime createdAt;

    @Convert(converter = MapToJsonConverter.class)
    private Map<String, Object> message;
}
