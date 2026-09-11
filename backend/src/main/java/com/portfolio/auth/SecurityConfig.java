package com.portfolio.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * 최소 baseline Spring Security 설정.
 *
 * <p>이 빈이 없으면 {@code spring-boot-starter-security}가 모든 요청에 기본 HTTP Basic 인증을
 * 자동 적용하고 콘솔에 랜덤 비밀번호를 찍는다. 그러면 인증이 필요 없는 공개 엔드포인트인
 * {@code GET /api/case-study}, {@code POST /api/inquiries}까지 401로 막혀버린다.
 *
 * <p>JWT 인증(TASK-15.2 JwtService, TASK-15.3 AuthController)이 아직 구현되지 않았으므로,
 * 지금은 의도적으로 모든 요청을 permitAll로 열어둔다. CSRF는 세션 쿠키를 쓰지 않는 stateless
 * API이므로 비활성화한다.
 *
 * <p>TASK-15.2/15.3에서 JWT 필터체인이 준비되면, 아래 {@code authorizeHttpRequests} 블록만
 * {@code /dashboard/**}에 인증을 요구하도록 좁히면 된다 — 이 파일의 기본 구조(빌더 체인)는
 * 그대로 재사용 가능하다.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
                .build();
    }
}
