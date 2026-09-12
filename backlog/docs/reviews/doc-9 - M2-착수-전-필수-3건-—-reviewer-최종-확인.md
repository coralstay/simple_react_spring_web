---
id: doc-9
title: M2 착수 전 필수 3건 — reviewer 최종 확인
type: specification
created_date: '2026-09-12 01:10'
updated_date: '2026-09-12 01:10'
---
# M2 착수 전 필수 3건 — reviewer 최종 확인 (코드 품질 관점)

확인자: simple-web-aplication-reviewer 세션
기준: TASK-4.3/TASK-1.6은 origin/main(커밋 21aa970d25411eab501647f2daf9ed68742a10f5)에 이미 merge된 상태 기준.
TASK-15.1은 origin/fix/TASK-15.1-securityconfig(PR #14, head 8661d1ddda00859d679f919080fb81e4a524d06a) 기준 — 아직 미merge.

## TASK-4.3 (git-format 셋업 스크립트) — 승인
verify(doc-7)의 기능 검증에 추가로 코드 자체(scripts/setup-dev-env.sh)를 훑었고 특이사항 없음.

## TASK-1.6 (vitest jsdom 환경) — 승인
verify(doc-7)의 기능 검증에 추가로 vite.config.ts의 test 블록 구성을 확인, doc-4가 요구한 사항과 일치.

## TASK-15.1 (SecurityConfig, PR #14 재작업본) — 승인, 사소한 권고 1건
`backend/src/main/java/com/portfolio/auth/SecurityConfig.java` 직접 읽음. doc-4/doc-7 지적사항
모두 반영됨: 공개 경로 2개만 permitAll, 나머지 authenticated, AC 문구도 실제 구현에 맞게 정정,
/error를 permitAll에 포함시킨 이유도 Javadoc에 정확히 설명돼 있음(Spring의 에러 forward가
필터체인을 다시 타는 것까지 고려한 점 좋음). CSRF 비활성화도 "세션 쿠키 미사용 stateless API"
근거가 지금 시점엔 타당함(단, TASK-15.2/15.3에서 JWT를 httpOnly 쿠키에 담기로 결정하면 그때는
CSRF 방어를 다시 켜야 함 — plan-v1이 JWT 저장 방식으로 httpOnly 쿠키를 우선 검토하라고 했으므로
그 시점에 재검토 필요, 지금은 문제 없음).

**비블로킹 권고**: 이 SecurityConfig의 permitAll/authenticated 경계를 검증하는 통합 테스트가
아직 없음(`@WebMvcTest` 또는 MockMvc로 공개 경로 200/404, 보호 경로 401/403 확인하는 테스트).
PR #9가 "전체 개방"으로 잘못 머지됐던 사고 자체가 바로 이 경계에서 난 것이라, 회귀 방지용 테스트
하나 추가해두면 같은 사고가 재발해도 CI가 바로 잡아줄 것. M4(테스트 마일스톤)에서 처리해도 되고,
지금 추가해도 됨 — 급하지 않음.

## 결론
doc-4의 "M2 착수 전 필수 3건" 전부 코드 품질 관점에서도 승인. reviewer 게이트 닫음 — PR #14
머지되면(현재 main이 전체개방 취약 상태이므로 조속 머지 권장, verify와 동일 의견) M2 계속 진행
가능.
