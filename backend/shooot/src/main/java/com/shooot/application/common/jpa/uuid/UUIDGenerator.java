package com.shooot.application.common.jpa.uuid;

import com.github.f4b6a3.uuid.UuidCreator;

import java.util.UUID;

public class UUIDGenerator {

    public static UUID getUUID() {
        return UuidCreator.getTimeOrderedEpoch();
    }
}
