---
id: TASK-14.3
title: ScrollReveal.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-18 19:42'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - frontend/src/components/ScrollReveal.tsx
parent_task_id: TASK-14
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 react-spring 리빌
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. frontend/src/components/ScrollReveal.tsx 작성: useInView로 뷰포트 진입 감지, useSpring으로 opacity/translateY 페이드인 애니메이션 적용.
2. 임시(미커밋) vitest+RTL 스펙으로 children 렌더링 검증 후 삭제, tsc --noEmit -p tsconfig.app.json, oxlint, pnpm build로 검증.
3. ScrollReveal.tsx만 커밋.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
@react-spring/web(useSpring)로 opacity/translateY를 애니메이션하고, 진입 감지는 기존 useInView(IntersectionObserver, once=true) 훅을 그대로 재사용하는 래퍼 컴포넌트로 구현. plan-v1의 components/ScrollReveal.tsx 배치와 일치.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/components/ScrollReveal.tsx 신규 작성: children을 감싸 뷰포트에 처음 들어올 때 opacity 0→1, translateY(24px)→0으로 페이드인시키는 스크롤 인뷰 리빌 래퍼. 진입 감지는 기존 useInView(IntersectionObserver, once=true) 훅을 그대로 재사용하고, 애니메이션 자체는 plan-v1이 지정한 @react-spring/web의 useSpring으로 처리(distance/duration/threshold props로 조정 가능). 검증: 임시(미커밋) vitest+@testing-library/react 스펙으로 children 렌더링 확인(pnpm test, 1/1 통과) 후 삭제, npx tsc --noEmit -p tsconfig.app.json 클린, npx oxlint src/components/ScrollReveal.tsx 클린(기존 useInView.ts의 set-state-in-effect 경고는 이 파일과 무관한 기존 이슈), pnpm build 성공. dependencies: [] — 독립 컴포넌트라 다른 미병합 PR에 대한 의존 없음.
<!-- SECTION:FINAL_SUMMARY:END -->
