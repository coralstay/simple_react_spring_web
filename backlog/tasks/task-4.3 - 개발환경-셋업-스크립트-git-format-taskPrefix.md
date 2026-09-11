---
id: TASK-4.3
title: 개발환경 셋업 스크립트 (git-format taskPrefix)
status: Done
assignee: []
created_date: '2026-09-11 04:28'
updated_date: '2026-09-11 05:41'
labels: []
dependencies: []
modified_files:
  - scripts/setup-dev-env.sh
parent_task_id: TASK-4
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 새로 clone한 환경에서 실행하면 git-format taskPrefix=TASK가 로컬 git config에 설정됨
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
scripts/setup-dev-env.sh 추가 완료. git config gitformat.taskPrefix TASK 를 설정하며 idempotent하게 재실행 가능. 검증: 실행 전 (worktree 기존값) TASK -> 1차 실행 후 git config --get gitformat.taskPrefix = TASK, 2차 실행(idempotency) exit 0, 값 그대로 TASK 유지. chmod +x로 executable 확인. 커밋 3d8a213([feat][scripts] git-format taskPrefix 셋업 스크립트, Task-Id: TASK-4.3).
<!-- SECTION:FINAL_SUMMARY:END -->
