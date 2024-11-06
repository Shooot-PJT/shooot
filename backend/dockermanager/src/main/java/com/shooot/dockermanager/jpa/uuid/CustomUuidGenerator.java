package com.shooot.dockermanager.jpa.uuid;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CustomUuidGenerator implements IdentifierGenerator {
    public CustomUuidGenerator() {

    }
    @Override
    public Object generate(SharedSessionContractImplementor sharedSessionContractImplementor, Object o) {
        return UUIDGenerator.getUUID();
    }
}
