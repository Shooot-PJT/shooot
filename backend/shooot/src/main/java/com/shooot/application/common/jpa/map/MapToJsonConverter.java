package com.shooot.application.common.jpa.map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Converter
@AllArgsConstructor
@Component
public class MapToJsonConverter implements AttributeConverter<Map<String, Object>, String> {
    private final ObjectMapper objectMapper;
    @Override
    public String convertToDatabaseColumn(Map map) {
        if(map == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String s) {
        if(s == null) {
            return null;
        }
        try {
            return objectMapper.readValue(s, Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
