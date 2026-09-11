---
id: TASK-15.1
title: SecurityConfig.java
status: Done
assignee: []
created_date: '2026-09-10 15:32'
updated_date: '2026-09-11 12:28'
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

커밋 해시 정정(plan-v12 준수): 실제 병합 대상 브랜치 fix/TASK-15.1-securityconfig에서 추적 가능한 해시는 4095652(fix)/40b77af(backlog Done)/173c5fc(doc-7+토큰기록) — 이전에 적었던 5da3975/66a7aecf는 superseded된 task/TASK-15.1 브랜치(같은 diff, PR#9가 이미 머지되어 폐기)의 해시였음. 토큰 사용량(Tokens-Used: 138640, Tool-Calls: 102)은 그대로 유효.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/auth/SecurityConfig.java 수정: doc-4/doc-7 리뷰의 지적대로 anyRequest().permitAll()을 걷어내고, GET /api/case-study·POST /api/inquiries 두 개만 명시적 permitAll, 나머지는 anyRequest().authenticated()로 좁혔다. AC #1도 'JWT 필터체인'(TASK-15.2/15.3 범위)에서 이 leaf의 실제 범위에 맞는 문구로 교체함. 실제 검증: docker compose up + gradlew bootRun 끝까지 기동 후 curl로 GET /api/case-study(404, 안 막힘), POST /api/inquiries(404, 안 막힘), 임의 보호경로(403, 정상 차단) 확인. verify 세션(doc-8, PASS)이 fix/TASK-15.1-securityconfig 브랜치를 main 위에서 재현 검증 완료.
<!-- SECTION:FINAL_SUMMARY:END -->
