---
id: TASK-1.3
title: 엔트리포인트 main.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:30'
updated_date: '2026-09-11 05:35'
labels: []
milestone: m-0
dependencies: []
documentation:
  - doc-4
modified_files:
  - frontend/src/main.tsx
parent_task_id: TASK-1
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 React 루트 마운트
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
정정(reviewer 피드백, doc-4): Final Summary의 'curl localhost:5199 200 확인'은 오기 — 실제 기본 포트는 Vite 기본값 5173.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
main.tsx에서 createRoot(#root)로 App을 StrictMode로 마운트(커밋 b0daa65). pnpm dev로 기동 후 curl http://localhost:5199/ HTTP 200 및 <script src=/src/main.tsx> 포함 확인.
<!-- SECTION:FINAL_SUMMARY:END -->
