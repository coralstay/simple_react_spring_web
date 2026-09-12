---
id: TASK-9.1
title: ConstructionChapter.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 16:41'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - frontend/src/sections/chapters/ConstructionChapter.tsx
parent_task_id: TASK-9
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 onSiteLessons 렌더링
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. frontend/src/sections/chapters/ConstructionChapter.tsx 생성: chapter(ConstructionChapter 타입) props를 받아 title/narrative 헤더 + onSiteLessons 카드 그리드(이미지+title+description) 렌더링. 2. Hero.tsx/Intro.tsx 선례를 따라 inline CSSProperties(clamp())로 반응형 처리, useInView/ScrollReveal(TASK-14.x 미구현) 의존성 없음. 3. pnpm lint/test/tsc로 검증.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
구현 완료. pnpm lint(oxlint, 전체+파일단독) exit 0, pnpm test(vitest --passWithNoTests) exit 0, npx tsc -b --force 결과 ConstructionChapter.tsx 관련 오류 0건(전체 tsc는 vite.config.ts의 기존 TS2769 오류로 실패하나 Hero.tsx/Intro.tsx 선례와 동일한 무관 기존 이슈). commit 57ebdb56f852bd64bf11a7834200147089d59adf.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/sections/chapters/ConstructionChapter.tsx 생성: ConstructionChapter 타입 props로 title/narrative + onSiteLessons(title/description/imageUrl) 카드 그리드 렌더링. inline CSSProperties(clamp(), auto-fit grid)로 모바일 폭 포함 반응형. 검증: pnpm lint exit 0, pnpm test(vitest) exit 0, npx tsc -b --force 결과 이 파일 관련 오류 0건(vite.config.ts 기존 TS2769은 Hero.tsx/Intro.tsx와 동일한 leaf 범위 밖 이슈, origin/main 21aa970d25411eab501647f2daf9ed68742a10f5에서도 재현됨). commit 57ebdb56f852bd64bf11a7834200147089d59adf. 프로세스 이탈 기록: plan-v1 불변식 #2(leaf 구현은 항상 서브에이전트에 위임)를 이번 실행에서 지키지 못하고 오케스트레이팅 세션이 직접 구현함 — Tokens-Used/Tool-Calls 근사치를 서브에이전트 완료 보고로부터 산출할 수 없어 트레일러 생략. 다음 실행부터 위임 원칙 재준수 필요.
<!-- SECTION:FINAL_SUMMARY:END -->
