package com.shooot.application.common.domain.httpstatus;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.http.HttpStatus;

@Converter(autoApply = true)
public class HttpStatusConverter implements AttributeConverter<HttpStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(HttpStatus httpStatus) {
        if(httpStatus == null) {
            return null;
        }
        return httpStatus.value();
    }

    @Override
    public HttpStatus convertToEntityAttribute(Integer integer) {
        if(integer == null) {
            return null;
        }
        return HttpStatus.valueOf(integer);
    }
}
