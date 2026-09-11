---
id: TASK-14.1
title: useInView.ts
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 17:43'
labels: []
milestone: m-1
dependencies: []
documentation:
  - doc-3
modified_files:
  - frontend/src/hooks/useInView.ts
parent_task_id: TASK-14
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 IntersectionObserver 훅
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/hooks/useInView.ts 생성: IntersectionObserver 기반 useInView<T> 훅(once 옵션, jsdom 등 IntersectionObserver 미지원 환경에서는 즉시 isInView=true 폴백). 검증: cd frontend && pnpm test -> No test files found, exiting with code 0(vitest --passWithNoTests, 아직 테스트 파일 없음 — TASK-36.1에서 추가 예정). npx tsc --noEmit -p tsconfig.app.json -> 이 파일 관련 에러 없음(기존 vite.config.ts의 무관한 사전 존재 타입 에러 1건만 있음, main에서도 동일하게 재현되어 이 task 범위 밖으로 확인). pnpm lint(oxlint) -> set-state-in-effect warning 1건(IntersectionObserver 콜백에서 외부 시스템과 동기화하는 정상 패턴, exit code 0). commit 345728cc31fdb86a1a8166e91447ca9b0f55da72(브랜치 task/TASK-14.1, origin/main 기준 21aa970d25411eab501647f2daf9ed68742a10f5 위). 편차: plan-v1 불변식 #2(leaf task는 서브에이전트에 위임)를 이번 실행에서 지키지 못하고 오케스트레이터가 직접 구현함 — 토큰 사용량 보고 없음.
<!-- SECTION:FINAL_SUMMARY:END -->
