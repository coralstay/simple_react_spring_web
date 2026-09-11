---
id: TASK-4.2
title: scripts/test-all.sh 작성
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 04:26'
labels: []
dependencies: []
documentation:
  - doc-4
modified_files:
  - scripts/test-all.sh
parent_task_id: TASK-4
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 프런트+백엔드 테스트 실행
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
scripts/test-all.sh로 프런트+백엔드 테스트 실행. 단, verify 세션이 지적한 대로 이 스크립트 자체는 정상 작동했고, 실제 버그는 frontend의 vitest 설정(테스트 없음=exit 1)에 있었음 — TASK-1.5에서 수정.
<!-- SECTION:NOTES:END -->
