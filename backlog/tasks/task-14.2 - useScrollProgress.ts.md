---
id: TASK-14.2
title: useScrollProgress.ts
status: Done
assignee:
  - '@claude'
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 18:45'
labels: []
milestone: m-1
dependencies: []
documentation:
  - doc-3
modified_files:
  - frontend/src/hooks/useScrollProgress.ts
parent_task_id: TASK-14
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 스크롤 진행률
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add frontend/src/hooks/useScrollProgress.ts implementing a React hook that tracks page scroll progress (0..1 ratio of scrollY over scrollable height) via window scroll/resize listeners, matching useInView.ts conventions (typed export, Korean doc comment for non-obvious behavior).
2. Per the one-file-per-leaf-task invariant, do not commit a separate test file. Verify with a temporary (uncommitted) vitest spec exercising the hook via @testing-library/react renderHook, then run pnpm --filter frontend build (tsc) for type-check, then delete the temp spec before committing.
3. Commit only frontend/src/hooks/useScrollProgress.ts.
4. Check AC #1, add final summary, mark Done.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented useScrollProgress hook (window scroll/resize listeners, clamped 0..1 ratio of scrollY over scrollable height). Verified with a temporary (uncommitted) vitest+RTL renderHook spec: 4/4 tests passed (no-overflow=0, top=0, mid-scroll=0.5, bottom=1, clamped>1 case=1). Also verified with tsc -p tsconfig.app.json --noEmit (clean) and oxlint (clean). Note: 'pnpm build' fails on main independent of this change (pre-existing vite.config.ts type error: vitest 'test' option not recognized by UserConfigExport overloads) — out of scope for this single-file leaf task, flagging for visibility.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added frontend/src/hooks/useScrollProgress.ts: a React hook returning document scroll progress as a 0..1 ratio (scrollY / (scrollHeight - clientHeight)), updated on window scroll/resize, clamped to [0,1], defaulting to 0 with no scrollable overflow. Verified via a temporary (not committed) vitest+@testing-library/react renderHook spec covering no-overflow, top, mid-scroll, bottom, and overscroll-clamp cases (4/4 passed), plus tsc --noEmit and oxlint clean on the new file.
<!-- SECTION:FINAL_SUMMARY:END -->
