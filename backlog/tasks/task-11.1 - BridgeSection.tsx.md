---
id: TASK-11.1
title: BridgeSection.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 23:44'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - frontend/src/sections/chapters/BridgeSection.tsx
parent_task_id: TASK-11
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 리모델링 하이라이트 포함
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/sections/chapters/BridgeSection.tsx를 신규 작성. ConstructionChapter.tsx/Intro.tsx(TASK-9.1/TASK-8.1, 미병합 브랜치에서 참고)와 동일한 컨벤션(함수형 컴포넌트 + named function + export default, XxxProps 인터페이스, 최상위 const CSSProperties 객체, clamp() 반응형, wordBreak: keep-all, section에 aria-label)을 따름. content/types.ts의 BridgeSection 타입은 이름 충돌을 피하기 위해 BridgeSectionContent로 별칭 import.

렌더 내용: (1) 헤더 - section.title(h2) + section.narrative(p). (2) 리모델링 하이라이트(AC #1) - renovation.beforeImageUrl/afterImageUrl을 각각 "시공 전"/"시공 후" 배지 라벨과 함께 나란히 비교 표시(auto-fit grid로 모바일에서 자동 스택), renovation.title/description, cost와 period를 작은 스탯 카드로 표시. 전체를 이미지쌍+텍스트의 2단 레이아웃(auto-fit minmax grid)으로 구성해 모바일 폭까지 반응형으로 무너지지 않게 함.

검증: cd frontend && pnpm lint (oxlint, exit 0) / pnpm test (vitest --passWithNoTests, "No test files found, exiting with code 0", exit 0) / npx tsc -b --force (exit 2, but only pre-existing TS2769 in vite.config.ts - 새 파일 관련 에러 0건, origin/main 21aa970 클린 체크아웃에서도 동일하게 재현됨을 확인).
<!-- SECTION:FINAL_SUMMARY:END -->
