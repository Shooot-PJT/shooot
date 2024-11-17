package com.shooot.application.project.ui.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStressTestLogResponse {

    private Long stressTestLogId;
    private String title;
    private LocalDateTime startTime;
    private String status;
    private Integer count;
    private Integer duration;
}
