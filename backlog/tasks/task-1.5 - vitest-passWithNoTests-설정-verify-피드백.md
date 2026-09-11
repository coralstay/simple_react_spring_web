---
id: TASK-1.5
title: vitest passWithNoTests 설정 (verify 피드백)
status: Done
assignee: []
created_date: '2026-09-11 04:21'
updated_date: '2026-09-11 04:42'
labels: []
dependencies: []
documentation:
  - doc-5
modified_files:
  - frontend/package.json
parent_task_id: TASK-1
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 테스트 파일이 없어도 exit 0, 실제 테스트 실패시에는 exit 1 유지
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/package.json의 test 스크립트를 'vitest run --passWithNoTests'로 변경. 검증: (1) 변경 전 pnpm test는 'No test files found, exiting with code 1'로 exit 1 확인. (2) 변경 후 pnpm test는 동일 메시지에 exit 0으로 통과 확인. (3) 임시 실패 테스트 파일을 추가해 pnpm test가 exit 1로 실패함을 재확인한 뒤 커밋 전 삭제. (4) repo root에서 bash scripts/test-all.sh 실행 결과 전체 exit code 0 확인. verify 세션 doc-2의 블로킹 이슈 1 해결. (PR#7 병합 과정에서 이 Done 처리가 실수로 되돌아갔던 것을 verify 세션 지적으로 복원함)
<!-- SECTION:FINAL_SUMMARY:END -->
