---
id: doc-2
title: M1 검증(verify) 결과
type: specification
created_date: '2026-09-10 23:37'
updated_date: '2026-09-10 23:37'
---
# M1(TASK-1~4) verify 세션 검증 결과

검증자: simple-web-application-verify 세션
검증 방법: 격리된 워크트리에서 4개 PR(#1 TASK-2, #2 TASK-3, #3 TASK-4, #4 TASK-1)을
실제 로컬 merge-tree 시뮬레이션으로 합친 뒤, 프런트/백엔드/docker-compose/test-all.sh를
실제로 빌드·부팅·실행해서 확인.

## 결론: FAIL — M2 착수 보류, 재작업 필요

## 통과한 부분
- 4개 브랜치 어디에도 실제 코드(backend/, frontend/, docker-compose.yml, .claude-rails.json,
  scripts/) 충돌 없음 — 충돌은 전부 backlog task 마크다운 frontmatter의 updated_date 한 줄뿐.
- 프런트: pnpm install/build 성공, pnpm dev로 실제 HTML 서빙 확인.
- 백엔드: ./gradlew build 성공, bootRun으로 실제 기동 + 실제 Postgres(localhost:5432/portfolio)
  접속 확인(Hikari 연결 로그, DB version 16.15 일치).
- docker-compose: postgres:16 컨테이너 정상 기동/헬스(pg_isready) 확인.
- one-file-per-leaf 불변식: 각 브랜치의 "Done 처리" 커밋은 해당 task 자신의 backlog
  마크다운 파일만 수정, 다른 소스 파일과 섞이지 않음(확인: TASK-1~4 전부).
- TASK-3.1의 AC 미체크(btree_gist)는 TASK-19.1로 의도적으로 이연한다고 Comments에 문서화됨
  — 정당한 스코프 결정.

## 블로킹 이슈

### 1. scripts/test-all.sh(=claude-rails testCommand)가 실제 통합 상태에서 exit 1로 실패
frontend/backend가 실제로 공존하는 상태(= M2부터 실제로 벌어질 상태)에서 스크립트를 돌리면:
- 프런트: `pnpm test`(vitest run)가 "No test files found, exiting with code 1" → 실패
- 백엔드: 테스트 소스 자체가 없어 NO-SOURCE로 형식상만 성공
- 전체 exit code 1

그런데 TASK-4 부모 태스크 Final Summary에는 "bash scripts/test-all.sh 실행 결과 exit 0으로
정상 동작 확인"이라고 적혀 있음 — 실제로는 그 검증 당시 워크트리에 frontend/backend가
아직 존재하지 않아 두 단계 다 skip되고 트리비얼하게 exit 0이 나온 상태였음. 즉 이 Done 근거는
스크립트가 실제로 지키려는 로직(테스트 실패 시 커밋 차단)을 전혀 검증하지 못한 것.

**요구 조치**: frontend/backend 양쪽에 최소 placeholder/smoke 테스트를 추가하거나, 테스트가
아직 없는 상태를 정상으로 취급하도록 vitest 설정(`--passWithNoTests` 등)을 조정해서, "테스트
없음"과 "테스트 실패"를 구분해야 함. 그리고 TASK-4의 Done 근거를 frontend+backend가 실제로
공존하는 상태에서 재검증한 뒤 갱신할 것. 이대로면 M2 첫 커밋부터 claude-rails pre-commit
훅에 막힘.

### 2. TASK-4.1, TASK-4.2가 AC 미체크 + Final Summary 없이 Done 처리됨
다른 leaf task(TASK-1.1/TASK-2.1/TASK-3.1)는 AC 체크 또는 이연 사유 문서화가 되어 있는데
TASK-4.1/TASK-4.2만 `- [ ]` 미체크 상태로 Done. CLAUDE.md 워크플로의 "객관적 증거 확인 후에만
--check-ac 체크 후 Done" 규칙 위반으로 보임. 근거 보완 또는 상태 정정 필요.

## 비블로킹 참고사항
- TASK-2/TASK-1 브랜치는 main의 backlog frontmatter milestone 필드 커밋(37aa03d) 이전에
  분기되어, 실제 `git merge` 시도가 로컬 pre_merge_check 훅(fast-forward-only)에 걸림 —
  GitHub PR 머지 UI에서도 동일한 한 줄(updated_date) 충돌이 날 가능성 높음. 4개 브랜치를
  최신 main 기준으로 rebase 후 머지 권장.
- docker-compose.yml에 healthcheck 없음(cosmetic), backend에 actuator 미의존이라 외부에서
  찌를 헬스 엔드포인트 없음(스캐폴드 단계라 당장 블로킹 아님), DB 크리덴셜 평문이나 로컬
  전용이라 낮은 심각도.

## 다음 단계
1. 위 블로킹 이슈 1, 2를 구현 세션이 반영.
2. 반영 후 다시 이 세션(verify)에 재검증 요청.
3. reviewer 세션의 별도 코드 품질 리뷰 피드백도 함께 반영 완료돼야 M2 착수.
