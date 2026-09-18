package com.portfolio.auth;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * JWT(HS256) 발급 및 검증을 담당하는 서비스.
 *
 * <p>이 클래스는 "subject(예: 사용자명/이메일)를 넣으면 서명된 토큰 문자열을 돌려주고, 토큰을
 * 넣으면 subject를 돌려준다"는 최소한의 책임만 가진다. 로그인 자격 증명 검증, HTTP 응답 포맷,
 * 쿠키/헤더 처리 등은 이 서비스의 책임이 아니며 이후 {@code AuthController}(TASK-15.3)에서
 * 이 서비스를 조합해 구현한다. 마찬가지로 이 서비스를 실제 요청 인증에 연결하는 JWT 필터
 * 등록도 {@code SecurityConfig}(TASK-15.1) 쪽 후속 task의 몫이다 — 여기서는 의도적으로
 * "토큰 발급/검증"이라는 AC 범위만 채운다.
 *
 * <h2>서명 키(jwt.secret)</h2>
 *
 * <p>현재 {@code application.yml}에는 {@code jwt.*} 프로퍼티가 전혀 정의되어 있지 않다.
 * 이 task는 {@code JwtService.java} 단 하나의 파일만 수정하도록 scope가 제한되어 있어
 * {@code application.yml}을 건드릴 수 없으므로, {@code @Value}의 기본값(default) 문법
 * ({@code ${jwt.secret:...}})으로 개발용 기본 시크릿을 직접 제공한다. 이렇게 하면
 * 별도 설정 없이도 애플리케이션이 정상 기동하고, 운영 환경에서는 환경변수나
 * {@code application-prod.yml}(TASK-43)을 통해 {@code jwt.secret}을 주입해 이 기본값을
 * 덮어쓰면 된다. 이 기본값은 소스에 그대로 노출되므로 <b>운영 환경에서 절대 그대로 써서는
 * 안 되며</b>, 진짜 운영 시크릿을 AWS Secrets Manager 등에서 안전하게 가져와 주입하는
 * 작업은 TASK-48.6에서 다룬다. 즉 지금은 "설정이 없어도 부팅되는 안전한 기본값 + 나중에
 * 덮어쓸 수 있는 seam"까지만 만들고, 실제 비밀 관리 인프라는 미리 만들지 않는다.
 *
 * <p>기본 시크릿은 HMAC-SHA 서명에 쓰이므로 충분히 길게(64바이트, 512비트) 잡아
 * {@code jjwt}가 요구하는 최소 키 길이 조건을 항상 만족시킨다. {@link Keys#hmacShaKeyFor}는
 * 키 바이트 길이에 따라 적합한 HMAC 알고리즘을 스스로 고르므로, 알고리즘을 별도로
 * 강제하지 않아도 안전한 조합이 선택된다.
 *
 * <h2>만료 시간(jwt.expiration-ms)</h2>
 *
 * <p>기본 만료 시간은 1시간(3,600,000ms)으로 잡는다. 리프레시 토큰이 아직 없는 상태(이 task
 * 범위에서는 의도적으로 만들지 않음)에서, 너무 짧으면 사용자가 자주 재로그인해야 하고 너무
 * 길면 탈취된 토큰의 유효 기간이 길어져 위험하다. 1시간은 이 프로젝트(개인 포트폴리오 어드민)
 * 규모에서 그 균형점으로 흔히 쓰이는 값이며, 필요하면 {@code jwt.expiration-ms} 프로퍼티로
 * 배포 환경마다 조정할 수 있다.
 *
 * <h2>검증 실패 처리 방식</h2>
 *
 * <p>{@link #parseSubject(String)}는 토큰이 만료되었거나(서명 위조, 형식 오류 등) 유효하지
 * 않으면 {@code Optional.empty()}나 {@code null}을 돌려주지 않고 {@code jjwt}가 던지는
 * {@link io.jsonwebtoken.JwtException}(및 하위 타입인 {@link io.jsonwebtoken.ExpiredJwtException},
 * {@link io.jsonwebtoken.security.SignatureException} 등)을 그대로 전파시킨다. 이 예외들을
 * 이 서비스 안에서 삼켜 별도의 "invalid" 신호(Optional/boolean)로 바꾸면 호출부마다 그 신호를
 * 다시 HTTP 401/403 응답으로 변환하는 코드를 반복해서 작성해야 한다. 대신 예외를 그대로
 * 흘려보내면, 이후 TASK-19에서 만들어질 전역 예외 처리기({@code GlobalExceptionHandler})가
 * {@code JwtException} 계열을 한 곳에서 잡아 일관된 401 응답으로 변환할 수 있다 — Spring
 * 애플리케이션에서 "실패는 예외로 표현하고 상위 계층에서 일괄 처리한다"는 흔한 관례를 따른
 * 선택이다.
 */
@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret:dev-only-insecure-default-jwt-signing-secret-change-me-in-production-0123456789abcdef}")
                    String secret,
            @Value("${jwt.expiration-ms:3600000}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    /**
     * 주어진 subject(예: 로그인한 사용자명/이메일)에 대한 서명된 JWT를 발급한다.
     *
     * <p>발급 시각({@code iat})과 만료 시각({@code exp}, 생성자에서 주입된
     * {@code jwt.expiration-ms} 기준)을 함께 담아 서명한다. 반환값은 {@code header.payload.signature}
     * 형태의 compact 직렬화 문자열로, HTTP 응답 바디나 {@code Authorization: Bearer <token>}
     * 헤더에 그대로 실어 보낼 수 있다.
     *
     * @param subject 토큰에 담을 주체(subject) 식별자. null/빈 값 검증은 호출부(TASK-15.3
     *     AuthController 등, 실제 로그인 자격 증명 검사를 수행하는 계층)의 책임으로 남겨둔다.
     * @return 서명된 JWT compact 문자열
     */
    public String issueToken(String subject) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(expirationMs);
        return Jwts.builder()
                .subject(subject)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(key)
                .compact();
    }

    /**
     * JWT를 서명 검증하고 그 안에 담긴 subject를 추출한다.
     *
     * <p>서명이 이 서비스가 가진 키로 검증되지 않거나, 만료되었거나, 형식이 잘못된 토큰이면
     * {@link io.jsonwebtoken.JwtException}(또는 그 하위 타입)이 던져진다. 이 메서드는 그
     * 예외를 잡지 않고 그대로 전파한다 — 자세한 이유는 클래스 Javadoc의 "검증 실패 처리
     * 방식" 절 참고.
     *
     * @param token 검증할 JWT compact 문자열
     * @return 토큰에 담긴 subject
     * @throws io.jsonwebtoken.JwtException 토큰이 유효하지 않거나 만료된 경우
     */
    public String parseSubject(String token) {
        Claims claims =
                Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        return claims.getSubject();
    }
}
