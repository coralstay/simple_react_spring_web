---
id: TASK-15.1
title: SecurityConfig.java
status: Done
assignee: []
created_date: '2026-09-10 15:32'
updated_date: '2026-09-11 12:19'
labels: []
milestone: m-2
dependencies: []
documentation:
  - doc-4
  - doc-7
modified_files:
  - backend/src/main/java/com/portfolio/auth/SecurityConfig.java
parent_task_id: TASK-15
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 공개 엔드포인트(GET /api/case-study, POST /api/inquiries)만 인증 없이 허용되고, 그 외 경로는 기본적으로 인증 필요(401/403)
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
토큰 사용량 기록(오케스트레이터가 서브에이전트 완료 보고에서 확인): Tokens-Used: 138640, Tool-Calls: 102. 커밋 해시(전체): 5da3975559d63359b5e12f8559c9aa7950e07ad6. doc-7 링크 보완(서브에이전트가 작업 당시 자기 워크트리에서 doc-7을 못 찾아 doc-4만 연결했었음 — main 공유 디렉토리에 doc-7이 이미 있었음, 워크트리 동기화 시점 문제).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/auth/SecurityConfig.java 수정: doc-4 리뷰(원본 리뷰, doc-7은 실제로 존재하지 않아 doc-4를 문서 링크로 사용 — 아래 참고)의 지적대로 anyRequest().permitAll()을 걷어내고, GET /api/case-study·POST /api/inquiries 두 개만 명시적 permitAll, 나머지는 anyRequest().authenticated()로 좁혔다. AC #1도 "JWT 필터체인"(TASK-15.2/15.3 범위)에서 이 leaf의 실제 범위에 맞는 문구로 교체함.

실제 재현 검증(로그 grep 아님, 완전 기동 후 curl):
1. `docker compose up -d` — Postgres 기동, `pg_isready` "accepting connections" 확인.
2. `cd backend && ./gradlew bootRun` — "Tomcat started on port 8080", "Started PortfolioApplication in 4.016 seconds" 로그로 완전 기동 확인(Hibernate가 PostgreSQL에 정상 연결됨, HikariPool 연결 성공 로그 포함).
3. `curl -i http://localhost:8080/api/case-study` -> HTTP 404 (Not Found) — Security에 막히지 않고 DispatcherServlet까지 도달, 컨트롤러 미구현이라 404. permitAll 정상 동작.
4. `curl -i -X POST http://localhost:8080/api/inquiries -H 'Content-Type: application/json' -d '{}'` -> HTTP 404 (Not Found) — 위와 동일 이유로 정상.
5. `curl -i http://localhost:8080/some/random/protected/path` -> HTTP 403 (Forbidden) — anyRequest().authenticated() 기본값이 정상적으로 막음(AuthorizationDeniedException -> Http403ForbiddenEntryPoint).
6. `docker compose down` — 컨테이너 정리 완료.

검증 중 발견/수정한 부가 이슈: 최초 구현에서는 GET /api/case-study, POST /api/inquiries도 403이 나왔다 — 원인은 컨트롤러가 없어 Spring이 내부적으로 /error로 forward하는데, 이 forward 요청도 시큐리티 필터체인을 다시 통과하면서 /error가 permitAll 대상이 아니어서 anyRequest().authenticated()에 걸려 403으로 막힌 것(TRACE 로그로 AuthorizationDeniedException at /error 확인). `/error`도 permitAll에 추가해 진짜 404가 그대로 보이도록 수정, 이후 재검증에서 위 3/4/5번 결과를 얻음.

커밋: 66a7aecf34433fe24dbbcc41b9a04e125e6e56e0 (task/TASK-15.1 브랜치, `git rev-parse HEAD`로 확인한 전체 해시, plan-v12 규칙 준수).

참고: 이번 작업 지시에 doc-7(검증 세션의 이전 초안 리뷰)을 확인하라고 되어 있었으나, backlog 어디에도(--plain, search, git 전체 히스토리 확인) doc-7이 존재하지 않았다 — 지시문에 담긴 3가지 필수 수정 사항 자체는 명확히 전달돼 그대로 반영했지만, doc-7 문서 실체는 확인 불가했다. documentation 필드는 대신 실제 존재하며 같은 이슈를 다루는 doc-4로 연결함.
<!-- SECTION:FINAL_SUMMARY:END -->
