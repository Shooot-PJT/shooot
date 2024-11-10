package com.shooot.dockermanager.publisher;

public interface Message {

    default Message getMessage() {
        return this;
    }

    public Integer getProjectJarFileId();
    public Integer getProjectId();
}
