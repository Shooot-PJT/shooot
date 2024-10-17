package com.shooot.application.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.common.exception.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    Logger logger = LoggerFactory.getLogger(CustomAuthEntryPoint.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException e) throws IOException {

        res.setStatus(HttpStatus.UNAUTHORIZED.value());
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setCharacterEncoding("utf-8");
        String errMsg = "";
        String errorCode = "";
        ErrorResponse errorResponse;
        if(e instanceof AuthenticationCredentialsNotFoundException){
            errMsg = "인증받지 않은 사용자";
            errorCode = "A001";
        } else {
            System.out.println(e.getClass().getName());
            errMsg = "알 수 없는 에러가 발생했습니다.";
            errorCode = "Z999";
            logger.error("{}", (Object[]) e.getStackTrace());
        }

         errorResponse = ErrorResponse.builder().code(errorCode).message(errMsg).build();

        objectMapper.writeValue(res.getWriter(), errorResponse);


    }

}
