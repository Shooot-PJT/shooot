package com.shooot.application.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.common.exception.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

public class JsonAuthFailureHandler implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse res, AuthenticationException exception) throws IOException, ServletException {

        res.setStatus(HttpStatus.UNAUTHORIZED.value());
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setCharacterEncoding("utf-8");
        String errMsg = "";

        if(exception instanceof UsernameNotFoundException){
            errMsg = "아이디 또는 비밀번호가 일치하지 않습니다.";
        } else if(exception instanceof BadCredentialsException){
            errMsg = "아이디 또는 비밀번호가 일치하지 않습니다.";
        } else {
            System.out.println(exception.getClass().getName());
            errMsg = "알 수 없는 에러가 발생했습니다.";
        }

        ErrorResponse errorResponse = ErrorResponse.builder().code("A001").message(errMsg).build();

        objectMapper.writeValue(res.getWriter(), errorResponse);
    }
}
