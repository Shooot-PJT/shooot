package com.shooot.application.security.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.security.token.JsonLoginAuthenticationToken;
import com.shooot.application.user.service.dto.UserLoginRequest;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.ObjectUtils;

import java.io.IOException;

public class JsonLoginAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final ObjectMapper objectMapper;


    public JsonLoginAuthenticationFilter(ObjectMapper objectMapper, AuthenticationManager authenticationManager){
        super(new AntPathRequestMatcher("/auth/login", "POST"), authenticationManager); // 필터 동작 조건 1
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        if(!isJson(request)){ // 필터 동작 조건 2
            throw new BadCredentialsException("is not json");
        }

        // 두 조건 모두 통과 시 id/pw 통해 인증
        UserLoginRequest request1 = objectMapper.readValue(request.getReader(), UserLoginRequest.class);//json 바디 가져와서 dto로 가공

        //빈 문자열 체크
        if(ObjectUtils.isEmpty(request1.getEmail()) || ObjectUtils.isEmpty(request1.getPassword())){
            throw new BadCredentialsException("id, password is null");
        }

        // 토큰 만들고 AuthenticationManager에 위임하여 인증 처리 진행
        JsonLoginAuthenticationToken jsonAuthenticationToken = new JsonLoginAuthenticationToken(request1.getEmail(), request1.getPassword());
        return getAuthenticationManager().authenticate(jsonAuthenticationToken);
    }

    private boolean isJson(HttpServletRequest request) {
        return request.getHeader("Content-Type").contains("application/json");
    }
}
