---
id: TASK-15.3
title: AuthController.java
status: Done
assignee:
  - '@claude'
created_date: '2026-09-10 15:32'
updated_date: '2026-09-19 00:44'
labels: []
milestone: m-2
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/auth/AuthController.java
parent_task_id: TASK-15
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 로그인 API
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. AuthController(@RestController, /api/auth)에 POST /login 매핑 추가, JwtService(TASK-15.2, Done)로 토큰 발급.
2. 별도 User 엔티티가 backlog에 없고 이 task는 AuthController.java 1개 파일만 수정하는 scope이므로, JwtService가 jwt.secret에 쓴 것과 같은 패턴으로 admin.username/admin.password를 @Value 기본값으로 제공. 비밀번호는 BCryptPasswordEncoder로 매 요청마다 기본값을 해시해 대조.
3. 요청 바디(username/password)와 응답 바디(token)는 새 파일을 만들 수 없으므로 AuthController 안에 static record로 정의.
4. ./gradlew compileJava/test로 검증(임시 단위 테스트로 성공/비밀번호 불일치/사용자명 불일치/null 비밀번호 4가지 케이스 확인 후 제거) 후 AC 체크, Final Summary 기록, Done 처리.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
AuthController(@RestController, /api/auth)에 POST /login 매핑 추가. plan-v1(로그인 계정은 최초 실행 시 시드 데이터로 1개 생성, 운영자 1인 전용이라 복잡한 권한 체계 불필요)과 이 task의 1파일 scope 제약에 따라 별도 User 엔티티/리포지토리 없이 admin.username/admin.password를 @Value 기본값(admin/changeme)으로 제공 — JwtService(TASK-15.2)가 jwt.secret에 쓴 것과 동일한 패턴. 비밀번호는 평문 비교 대신 BCryptPasswordEncoder로 매 요청마다 기본값을 해시해 대조. 로그인 성공 시 JwtService.issueToken(adminUsername)으로 JWT 발급, 실패 시(사용자명 불일치/비밀번호 불일치/비밀번호 null) 401 반환. 요청/응답 바디는 새 파일 없이 AuthController 안의 static record(LoginRequest/LoginResponse)로 정의.

주의(후속 task 필요): 현재 SecurityConfig(TASK-15.1)는 GET /api/case-study, POST /api/inquiries, /error만 permitAll이라 /api/auth/login은 기본값(authenticated)에 걸려 401로 막힌다. 로그인 전에는 JWT를 가질 수 없으므로 이 엔드포인트도 permitAll이어야 하는데, 이 task는 AuthController.java 1개 파일만 수정하는 scope라 SecurityConfig.java는 건드리지 않았다 — SecurityConfig에 /api/auth/login permitAll을 추가하는 것은 후속 task의 몫으로 남겨둔다.

검증: 샌드박스에 Java 25 toolchain이 없어(네트워크 정책상 자동 다운로드 불가) TASK-13.4/13.5와 동일하게 build.gradle.kts의 languageVersion을 임시로 21로 낮춰 './gradlew compileJava' BUILD SUCCESSFUL 확인. 이어서 src/test/java에 임시 JUnit 테스트(AuthControllerManualVerifyTest)를 추가해 4가지 케이스(정상 로그인→토큰 발급 후 JwtService.parseSubject로 subject 왕복 확인, 잘못된 비밀번호→401, 잘못된 사용자명→401, null 비밀번호→401)를 './gradlew test'로 모두 통과 확인한 뒤 그 임시 테스트 파일을 삭제(최종 커밋에는 포함하지 않음, AC 범위 밖). 이후 build.gradle.kts를 원본(25)으로 복원, git diff로 무변경 확인. Maven Central이 프록시를 통해 두 차례 429(Too Many Requests)를 반환해 최초 두 번의 시도가 실패했으나 재시도 후 정상 해석됨(일시적 레이트리밋, 코드와 무관).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
AuthController.java(backend/src/main/java/com/portfolio/auth/AuthController.java) 신규 작성 — POST /api/auth/login 매핑(AC #1)을 추가해 JwtService(TASK-15.2, Done)로 로그인 API를 구현. User 엔티티가 없고 1파일 scope 제약이 있어 admin.username/admin.password @Value 기본값(admin/changeme, JwtService의 jwt.secret과 동일한 패턴)을 시드 운영자 계정으로 사용하고, 비밀번호는 BCryptPasswordEncoder로 해시 대조. 로그인 성공 시 200+JWT, 실패 시(사용자명/비밀번호 불일치, null 비밀번호) 401 반환. 요청/응답 DTO는 AuthController 내부 static record로 정의(별도 파일 생성 없이 1파일 scope 준수).

알려진 제약(후속 task 필요): SecurityConfig(TASK-15.1)가 아직 /api/auth/login을 permitAll에 포함하지 않아 이 엔드포인트가 현재는 401(인증 필요)로 막혀 있다 — 로그인 전에는 토큰이 없으므로 실사용을 위해서는 SecurityConfig에 이 경로를 permitAll로 추가하는 후속 task가 필요하다(이 task의 1파일 scope 밖).

검증: Java 25 toolchain 부재로 TASK-13.4/13.5와 동일하게 임시로 languageVersion=21로 낮춰 './gradlew compileJava' BUILD SUCCESSFUL 확인, 임시 JUnit 테스트로 정상 로그인(토큰 발급+subject 왕복)/잘못된 비밀번호/잘못된 사용자명/null 비밀번호 4가지 케이스를 './gradlew test'로 모두 통과 확인 후 임시 테스트 삭제, build.gradle.kts 원본(25) 복원 후 git diff로 무변경 확인.
<!-- SECTION:FINAL_SUMMARY:END -->
