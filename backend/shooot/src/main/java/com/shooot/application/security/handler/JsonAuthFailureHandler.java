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
        String code = "";
        if(exception instanceof UsernameNotFoundException){
            code = "A001";
            errMsg = "아이디 또는 비밀번호가 일치하지 않습니다.";
        } else if(exception instanceof BadCredentialsException){
            code = "A002";
            errMsg = "올바른 로그인 시도가 아닙니다.";
        } else {
            System.out.println(exception.getClass().getName());
            code = "Z999";
            errMsg = "알 수 없는 에러가 발생했습니다.";
        }

        ErrorResponse errorResponse = ErrorResponse.builder().code(code).message(errMsg).build();

        objectMapper.writeValue(res.getWriter(), errorResponse);
    }
}
