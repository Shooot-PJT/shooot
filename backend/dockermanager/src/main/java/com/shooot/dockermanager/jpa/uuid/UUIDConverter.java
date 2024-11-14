package com.shooot.dockermanager.jpa.uuid;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.UUID;

@Converter
public class UUIDConverter implements AttributeConverter<String, UUID> {
    @Override
    public UUID convertToDatabaseColumn(String string) {
        if(string == null || string.isEmpty()) {
            return null;
        }
        return UUID.fromString(string);
    }

    @Override
    public String convertToEntityAttribute(UUID uuid) {
        if(uuid == null) {
            return null;
        }
        return uuid.toString();
    }

}
