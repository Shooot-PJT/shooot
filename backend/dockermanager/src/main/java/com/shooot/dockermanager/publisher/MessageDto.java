package com.shooot.dockermanager.publisher;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MessageDto {
    private Type type;
    private Message message;


    public enum Type {
        DOCKER_BUILD_ERROR,
        DOCKER_RUNTIME_ERROR,
        DOCKER_RUN_DONE,
        DOCKER_CONSOLE_LOG,
        ;
    }

}
