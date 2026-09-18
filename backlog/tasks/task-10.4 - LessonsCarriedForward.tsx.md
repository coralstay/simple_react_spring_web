---
id: TASK-10.4
title: LessonsCarriedForward.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-12 05:41'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - frontend/src/sections/chapters/LessonsCarriedForward.tsx
parent_task_id: TASK-10
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 운영 연결 카드
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
MaterialsHandled.tsx/CraftDetails.tsx 컨벤션(inline CSSProperties, heading+auto-fit grid+card)을 그대로 따라 LessonCarriedForward[](title/description, 이미지 없음)를 렌더링하는 텍스트 전용 카드 그리드로 구현. 서브에이전트(Agent tool)에 위임(plan-v1 불변식 #2).
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
구현은 서브에이전트가 담당(불변식 #2 준수), 오케스트레이터가 재검증: pnpm lint(oxlint) exit 0(기존 useInView.ts 무관 경고만 존재), pnpm test(vitest --passWithNoTests) exit 0, npx tsc -b --force exit 0(TASK-54.1로 vite.config.ts TS2769 이미 해결되어 신규 오류 0건).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/sections/chapters/LessonsCarriedForward.tsx 신규 생성(파일 1개) — interior 챕터의 lessonsCarriedForward(지금 운영에 그대로 쓰이는 감각) 섹션을 텍스트 전용 카드 그리드(제목+설명, 이미지 없음)로 렌더링. MaterialsHandled.tsx/CraftDetails.tsx와 동일한 inline CSSProperties/auto-fit grid/wordBreak:keep-all 컨벤션 준수. 검증: pnpm lint exit 0, pnpm test exit 0, npx tsc -b --force exit 0(신규 오류 없음).
<!-- SECTION:FINAL_SUMMARY:END -->
