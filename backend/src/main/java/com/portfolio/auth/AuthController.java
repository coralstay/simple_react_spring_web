package com.portfolio.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * {@code POST /api/auth/login} — 시드 운영자 계정 1개로 로그인해 JWT를 발급하는 컨트롤러.
 *
 * <p>plan-v1이 설명하는 "/dashboard는 운영자 1인 전용이라 복잡한 권한 체계는 불필요"라는
 * 전제에 따라, 이 프로젝트에는 별도의 User 엔티티/테이블이 없다(그런 task도 backlog에 없음).
 * 이 task는 {@code AuthController.java} 단 하나의 파일만 수정하도록 scope가 제한되어 있어
 * 새 엔티티/리포지토리 파일을 만들 수 없으므로, {@link JwtService}(TASK-15.2)가 이미 쓴 것과
 * 같은 패턴으로 {@code admin.username}/{@code admin.password}를 {@code @Value} 기본값으로
 * 직접 제공한다 — 별도 설정 없이도 로그인 API가 바로 동작하고, 운영 환경에서는 환경변수나
 * {@code application-prod.yml}(TASK-43)로 덮어쓰면 된다.
 *
 * <p>기본 비밀번호는 소스에 평문으로 노출되므로 <b>운영 환경에서 절대 그대로 써서는 안 되며</b>,
 * 반드시 {@code admin.password}를 환경변수 등으로 덮어써야 한다. 그래도 비교 자체는 평문
 * 저장/비교 대신 {@link BCryptPasswordEncoder}로 매 요청마다 기본 비밀번호를 해시해 대조한다 —
 * 설정값이 로그나 메모리 덤프에 그대로 남는 것보다 낫고, 이후 실제 User 저장소가 생기면
 * (지금은 범위 밖) 이미 저장된 해시와 비교하는 형태로 자연스럽게 옮겨갈 수 있다.
 *
 * <p>이 엔드포인트는 로그인 전이라 JWT를 아직 가질 수 없으므로 반드시 인증 없이 호출 가능해야
 * 하는데, 현재 {@code SecurityConfig}(TASK-15.1)는 {@code GET /api/case-study}와
 * {@code POST /api/inquiries}만 permitAll이라 이 엔드포인트는 기본값(authenticated)에 걸려
 * 401로 막힌다. 이 task는 {@code AuthController.java} 한 파일만 수정하는 scope라
 * {@code SecurityConfig.java}는 건드리지 않는다 — {@code /api/auth/login}을 permitAll로
 * 여는 것은 SecurityConfig를 수정하는 후속 task의 몫으로 남긴다.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;
    private final String adminUsername;
    private final String adminPasswordHash;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(
            JwtService jwtService,
            @Value("${admin.username:admin}") String adminUsername,
            @Value("${admin.password:changeme}") String adminPassword) {
        this.jwtService = jwtService;
        this.adminUsername = adminUsername;
        this.adminPasswordHash = passwordEncoder.encode(adminPassword);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        boolean usernameMatches = adminUsername.equals(request.username());
        boolean passwordMatches =
                request.password() != null
                        && passwordEncoder.matches(request.password(), adminPasswordHash);
        if (!usernameMatches || !passwordMatches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = jwtService.issueToken(adminUsername);
        return ResponseEntity.ok(new LoginResponse(token));
    }

    /** 로그인 요청 바디({@code username}/{@code password}). */
    public record LoginRequest(String username, String password) {}

    /** 로그인 성공 응답 바디(발급된 JWT). */
    public record LoginResponse(String token) {}
}
