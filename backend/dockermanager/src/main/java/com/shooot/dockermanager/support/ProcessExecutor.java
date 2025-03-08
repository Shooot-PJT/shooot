package com.shooot.dockermanager.support;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class ProcessExecutor {
    public void executeProcess(ProcessBuilder processBuilder, String taskDescription, String target)
            throws IOException, InterruptedException {
        int exitCode = processBuilder.start().waitFor();
        if (exitCode != 0) {
            log.error("error : {}", processBuilder.command().toString());
            throw new RuntimeException("Error occurred while executing " + taskDescription + " on instance " + target);
        }
    }

    public void executeProcess(String... commands) {
        try {
            ProcessBuilder builder = new ProcessBuilder(commands);
            int exitCode = builder.start().waitFor();
            if (exitCode != 0) {
                log.info("Failed to execute command: {}", builder.command().toString());
                throw new RuntimeException("Failed to execute command");
            }
        } catch (Exception e) {
            log.error("Error executing command: {}", e.getMessage());
            throw new RuntimeException("Error executing command", e);
        }
    }
}