---
id: TASK-1.1
title: package.json 초기 설정
status: Done
assignee: []
created_date: '2026-09-10 15:30'
updated_date: '2026-09-11 05:35'
labels: []
milestone: m-0
dependencies: []
modified_files:
  - frontend/package.json
parent_task_id: TASK-1
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 의존성(react-spring, vite 등) 명시
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
pnpm create vite로 스캐폴딩 후 @react-spring/web, vitest, @testing-library/react, @testing-library/jest-dom, jsdom, prettier를 package.json에 추가. pnpm install/pnpm build 성공으로 검증(커밋 8acf930).
<!-- SECTION:FINAL_SUMMARY:END -->
