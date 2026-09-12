---
id: TASK-54.1
title: vite.config.ts defineConfig 타입 수정
status: Done
assignee: []
created_date: '2026-09-12 00:53'
updated_date: '2026-09-12 00:55'
labels: []
milestone: m-7
dependencies: []
modified_files:
  - frontend/vite.config.ts
parent_task_id: TASK-54
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 pnpm build(tsc -b && vite build)가 TS2769 오류 없이 통과
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. frontend/vite.config.ts에서 defineConfig import를 'vite'에서 'vitest/config'로 변경(vite 재수출 + test 필드 타입 확장, 표준 vitest 패턴). 2. proxy/plugins/test.environment/test.setupFiles 등 나머지 설정은 그대로 유지(surgical fix, 리팩터링 아님). 3. pnpm lint/test/tsc/build로 전체 검증, 특히 pnpm build가 처음으로 완주하는지 확인.
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/vite.config.ts: defineConfig import를 'vite' → 'vitest/config'로 1줄 변경. tsc가 test 필드를 인식하지 못해 나던 TS2769(UserConfigExport에 'test' 없음) 오류 해결 — 이는 여러 leaf task PR(#16 Hero.tsx, #17 Intro.tsx 등)에서 반복적으로 '이 leaf 범위 밖의 기존 이슈'로 언급되던 프로젝트 전역 pnpm build 실패였음. 검증: pnpm lint(oxlint) exit 0, pnpm test(vitest --passWithNoTests) exit 0, npx tsc -b --force 전체 오류 0건, pnpm build(tsc -b && vite build) 완주 성공(dist 산출물 생성 확인) — 이 저장소에서 pnpm build가 처음으로 끝까지 성공한 사례. commit b9e915eed64f3fac63bdf5b07a61c20977179fab. Tokens-Used(서브에이전트 근사): 55975. Tool-Calls(서브에이전트 근사): 11.
<!-- SECTION:FINAL_SUMMARY:END -->
