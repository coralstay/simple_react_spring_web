---
id: doc-8
title: 'PR #14 SecurityConfig 재작업 검증 결과'
type: specification
created_date: '2026-09-11 12:26'
updated_date: '2026-09-11 12:26'
---
# PR #14(fix/TASK-15.1-securityconfig) 검증 결과

검증자: simple-web-application-verify 세션
대상: origin/fix/TASK-15.1-securityconfig, head 173c5fc7eb26f0bcba87e21d76d6111d22a764e6
(main 21aa970d25411eab501647f2daf9ed68742a10f5 위에 fast-forward, 충돌 없음)
배경: main에 이미 머지된 PR #9(전체 개방 permitAll)를 고치는 긴급 후속 PR.

## 결론: PASS (기능) — 조속히 머지 권장. 문서 정확성 사소한 결함 2건은 비블로킹.

## 기능 검증 (통과)
- SecurityConfig가 `GET /api/case-study`, `POST /api/inquiries`, `/error`만 permitAll,
  나머지는 `anyRequest().authenticated()`로 정확히 좁혀짐.
- 앱을 실제로 끝까지 기동(Postgres 포함)한 뒤 curl로 재현: GET /api/case-study → 404(안 막힘),
  POST /api/inquiries → 404(안 막힘), 임의 보호경로 → 403(정상 차단), /error → 500(보안 차단
  아님). 전부 구현 세션 주장과 일치.
- ./gradlew build 성공, scripts/test-all.sh 최종 exit 0(frontend 회귀 없음).
- actuator/swagger 등 유사 위험 경로 추가 확인 — 해당 의존성 자체가 없어 추가 우려 없음.

## 비블로킹 — backlog 기록 정확성 결함 2건
1. **Final Summary 본문이 최신 Documentation 필드와 모순**: 본문에 "doc-7이 실제로 존재하지
   않아 doc-4를 대신 링크했다"는 문장이 남아있는데, 정작 Documentation 필드엔 이미
   `doc-4, doc-7` 둘 다 걸려있음(같은 커밋에서 갱신). 본문 문장만 갱신이 안 됨.
2. **커밋 해시 인용 오류**: Implementation Notes/Final Summary에 인용된 전체 해시
   (`5da3975...`, `66a7aecf...`)가 실제 병합된 PR(fix/TASK-15.1-securityconfig) 히스토리에
   없는, 이전에 superseded된 브랜치(task/TASK-15.1)의 커밋임. `git patch-id`로 확인한 결과
   diff 내용 자체는 실제 병합분과 동일해서 설명하는 코드 변경은 맞지만, 이 프로젝트의 "전체
   커밋 해시로 못박기" 관례(plan-v12)로 그 해시를 `git show`해보면 실제 merge된 히스토리에서
   찾을 수 없음.

## 다음 단계
사용자에게 PR #14 조속 머지 권장(main이 현재 전체 개방 상태라 노출 창을 줄이는 게 우선).
위 2건은 급하지 않으니 다음 커밋 때 텍스트만 정정하면 됨.
