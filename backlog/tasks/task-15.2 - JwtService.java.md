---
id: TASK-15.2
title: JwtService.java
status: Done
assignee: []
created_date: '2026-09-10 15:32'
updated_date: '2026-09-18 13:44'
labels: []
milestone: m-2
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/auth/JwtService.java
parent_task_id: TASK-15
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 토큰 발급/검증
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add backend/src/main/java/com/portfolio/auth/JwtService.java as a Spring @Service implementing HS256 JWT issuance (issueToken(subject)) and verification/parsing (parseSubject(token)), satisfying AC #1 (token issue/verify).
2. Signing secret and expiry come from jwt.secret/jwt.expiration-ms via @Value with dev-only defaults, since application.yml is out of this leaf task's one-file scope (real secret plumbing is TASK-43/TASK-48.6).
3. Let jjwt's JwtException propagate on invalid/expired tokens rather than swallowing it, for the future GlobalExceptionHandler (TASK-19) to translate into HTTP responses.
4. Verify with javac + jjwt 0.13.0/jackson jars from Maven Central (Gradle's Java 25 toolchain is not installable in this sandbox) plus a runtime issue/parse round-trip, since a full ./gradlew build isn't possible here.
5. Commit only JwtService.java. Check AC #1, add final summary, mark Done.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented JwtService as a Spring @Service (constructor @Value injection for jwt.secret/jwt.expiration-ms, dev-only defaults since application.yml is out of scope). issueToken(subject) signs a compact HS256 token (iat/exp via Keys.hmacShaKeyFor); parseSubject(token) verifies+parses and returns the subject, letting JwtException propagate (TASK-19 GlobalExceptionHandler will translate it later).

Verification: could not run ./gradlew (this sandbox has no Java 25 toolchain — openjdk-25 is 404 on the configured apt mirrors, and settings.gradle.kts has no foojay-resolver auto-download plugin). Instead: (1) javac compiled JwtService.java cleanly against jjwt-api/impl/jackson 0.13.0 jars pulled directly from Maven Central plus minimal stub @Value/@Service annotation classes — zero errors/warnings; (2) a standalone runtime check (new JwtService(secret, 3600000L); issueToken("alice") -> parseSubject returns "alice"; a tampered token throws SignatureException as expected) — all assertions passed. This substitutes for but does not replace a real ./gradlew build/test run, which should happen in an environment with the Java 25 toolchain before/at merge time.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added backend/src/main/java/com/portfolio/auth/JwtService.java: a Spring @Service with issueToken(subject) (signs a compact HS256 JWT with iat/exp, default 1h expiry) and parseSubject(token) (verifies signature+expiry, returns the subject, propagates jjwt's JwtException on failure for TASK-19's future GlobalExceptionHandler to handle). Secret/expiry are @Value-injected with dev-only defaults (jwt.secret/jwt.expiration-ms), since application.yml is outside this task's one-file scope — real secret management is TASK-43/TASK-48.6. Deviation: ./gradlew is unusable in this sandbox (no Java 25 toolchain, apt's openjdk-25 404s, no foojay-resolver plugin configured) — verified instead via a standalone javac compile against jjwt 0.13.0 + jackson jars from Maven Central (clean) and a runtime issue/parse round-trip (correct subject round-trip; tampered token rejected with SignatureException). A real ./gradlew build/test should still run wherever the Java 25 toolchain is available before this is considered CI-verified.
<!-- SECTION:FINAL_SUMMARY:END -->
