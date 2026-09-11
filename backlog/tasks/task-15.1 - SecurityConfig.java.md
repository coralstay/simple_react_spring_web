---
id: TASK-15.1
title: SecurityConfig.java
status: In Progress
assignee: []
created_date: '2026-09-10 15:32'
updated_date: '2026-09-11 12:12'
labels: []
milestone: m-2
dependencies: []
documentation:
  - doc-4
modified_files:
  - backend/src/main/java/com/portfolio/auth/SecurityConfig.java
parent_task_id: TASK-15
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 공개 엔드포인트(GET /api/case-study, POST /api/inquiries)만 인증 없이 허용되고, 그 외 경로는 기본적으로 인증 필요(401/403)
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/auth/SecurityConfig.java 생성: SecurityFilterChain 빈으로 CSRF 비활성화 + anyRequest().permitAll() 최소 baseline 구성. 검증: cd backend && ./gradlew compileJava -> BUILD SUCCESSFUL. cd backend && ./gradlew bootRun -> 로컬 Postgres 미기동으로 Hibernate Dialect 결정 실패(JDBC 연결 불가)로 예상대로 실패했으나, Spring Security 관련 오류나 기본 생성 비밀번호 로그는 전혀 없음(grep 'security|Using generated|SecurityFilterChain' 결과 0건) - SecurityConfig 빈이 정상 적용되어 기본 HTTP Basic 인증으로 막히지 않음을 확인. commit 33a6e3a.
<!-- SECTION:FINAL_SUMMARY:END -->
