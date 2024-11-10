package com.shooot.application.projecttest.subscriber;

public interface Message {

    default Message getMessage() {
        return this;
    }

    public Integer getProjectId();
    public Integer getProjectJarFileId();
}
