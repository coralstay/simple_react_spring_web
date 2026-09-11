package com.portfolio.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
 * 지금은 실제 공개 엔드포인트 두 개({@code GET /api/case-study}, {@code POST /api/inquiries})만
 * 명시적으로 permitAll로 열어두고, 나머지 모든 요청은 기본적으로 인증을 요구한다
 * (authenticated). JWT 메커니즘이 아직 연결되지 않았으므로 지금 시점에는 그 외 경로가
 * 401/403으로 막히는 것이 의도된 안전한 기본값이다 — 활짝 열어두는 것보다 낫다.
 * CSRF는 세션 쿠키를 쓰지 않는 stateless API이므로 비활성화한다.
 *
 * <p>TASK-15.2/15.3에서 JWT 필터체인이 준비되면, 이 파일에 JWT 필터를 추가하고 필요에 따라
 * {@code authorizeHttpRequests} 규칙을 조정하면 된다 — 이 파일의 기본 구조(빌더 체인)는
 * 그대로 재사용 가능하다.
 *
 * <p>{@code /error}도 permitAll에 포함시킨다: 컨트롤러가 아직 없는 공개 경로에 요청이 오면
 * Spring이 내부적으로 {@code /error}로 forward하는데, 이 forward 요청도 시큐리티 필터체인을
 * 다시 통과한다 — {@code /error}가 인증을 요구하면 원래는 404여야 할 응답이 403으로 가려져서
 * "공개 엔드포인트가 막혔다"는 착시를 일으킨다. permitAll로 열어둬야 컨트롤러 미구현 상태에서도
 * 진짜 404가 그대로 보인다.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/api/case-study").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/inquiries").permitAll()
                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated())
                .build();
    }
}
