package com.shooot.application.project.domain;

import java.io.Serializable;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "ProjectInvitation", timeToLive = 86400)
public class ProjectInvitation implements Serializable {

    @Id
    private UUID id;
    private Integer projectId;
    private Integer userId;
}
