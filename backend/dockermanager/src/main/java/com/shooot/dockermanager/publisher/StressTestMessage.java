package com.shooot.dockermanager.publisher;

import com.shooot.dockermanager.dto.Usage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StressTestMessage {

    private Integer projectJarFileId;
    private String httpMethod;
    private String url;
    private Usage curr;
    private Usage avg;
    private Usage min;
    private Usage max;
}
