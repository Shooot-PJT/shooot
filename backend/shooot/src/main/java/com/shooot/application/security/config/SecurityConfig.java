package com.shooot.application.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shooot.application.security.filter.JsonLoginAuthenticationFilter;
import com.shooot.application.security.handler.CustomAccessDeniedHandler;
import com.shooot.application.security.handler.CustomAuthEntryPoint;
import com.shooot.application.security.handler.JsonAuthFailureHandler;
import com.shooot.application.security.handler.JsonAuthSuccessHandler;
import com.shooot.application.security.provider.JsonLoginAuthenticationProvider;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.DelegatingSecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new JsonAuthFailureHandler();
    }

    @Bean
    public AuthenticationEntryPoint accessAuthEntryPoint() {
        return new CustomAuthEntryPoint();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    public AuthenticationProvider jsonAuthenticationProvider() {
        return new JsonLoginAuthenticationProvider(userDetailsService, bCryptPasswordEncoder());
    }

    @Bean
    public AccessDeniedHandler jsonAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }


    public JsonAuthSuccessHandler jsonAuthSuccessHandler() {
        return new JsonAuthSuccessHandler(delegatingSecurityContextRepository());
    }

    public JsonLoginAuthenticationFilter jsonLoginAuthenticationFilter(
        AuthenticationManager authenticationManager) {
        JsonLoginAuthenticationFilter filter = new JsonLoginAuthenticationFilter(objectMapper,
            authenticationManager);
        filter.setAuthenticationFailureHandler(authenticationFailureHandler());
        filter.setAuthenticationSuccessHandler(jsonAuthSuccessHandler());

        return filter;
    }

    @Bean
    public DelegatingSecurityContextRepository delegatingSecurityContextRepository() {
        return new DelegatingSecurityContextRepository(
            new RequestAttributeSecurityContextRepository(),
            new HttpSessionSecurityContextRepository()
        );
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // 와일드카드 대신 특정 출처만 허용
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:4173"));

        // 허용할 HTTP 메서드 설정
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // 허용할 HTTP 헤더 설정
        config.setAllowedHeaders(
            List.of("Origin", "Access-Control-Allow-Origin", "Content-Type", "Accept",
                "Authorization", "Access", "X-Accel-Buffering", "Connection",
                "Access-Control-Allow-Credentials", "ngrok-skip-browser-warning", "Cookies",
                "set-Cookies"));

        // 특정 헤더를 노출 (필요한 경우)
        config.setExposedHeaders(
            List.of("Origin", "Access-Control-Allow-Origin", "Content-Type", "Accept",
                "Authorization", "Access", "X-Accel-Buffering", "Connection",
                "Access-Control-Allow-Credentials", "ngrok-skip-browser-warning", "Cookies",
                "set-Cookies"));

        // 자격 증명(쿠키, 인증 정보 등)을 허용할 경우 true로 설정
        config.setAllowCredentials(true);

        // CORS 설정을 URL에 매핑
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);
        http.anonymous(AbstractHttpConfigurer::disable);
//        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        AuthenticationManager authenticationManager = authenticationManager(
            http.getSharedObject(AuthenticationConfiguration.class));

        ProviderManager p = (ProviderManager) authenticationManager;
        p.getProviders().add(jsonAuthenticationProvider());

        http.securityContext((securityContext) -> {
            securityContext.securityContextRepository(delegatingSecurityContextRepository());
            securityContext.requireExplicitSave(
                true); // true로 주게 되면 SecurityContextHolder의 값이 변경되어도 자동 저장되지 않게 함.
        });

        http.authorizeHttpRequests(
            (auth) -> auth.requestMatchers("/", "/auth/**", "/admin/**", "/health-check",
                    "/swagger-ui/**", "/v3/api-docs/**", "/projects/invitations/**").permitAll()
                .anyRequest().authenticated());
        http.addFilterAt(jsonLoginAuthenticationFilter(authenticationManager),
            UsernamePasswordAuthenticationFilter.class);
        http.sessionManagement(httpSecuritySessionManagementConfigurer -> {
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.NEVER);
        });
        http.exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
            httpSecurityExceptionHandlingConfigurer
                .authenticationEntryPoint(accessAuthEntryPoint()));

        return http.build();
    }
}
