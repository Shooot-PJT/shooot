package com.shooot.dockermanager.publisher;

public interface Message {

    default Object getMessage() {
        return this;
    }
}
