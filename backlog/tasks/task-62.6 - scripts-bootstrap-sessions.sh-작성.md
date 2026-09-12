---
id: TASK-62.6
title: scripts/bootstrap-sessions.sh 작성
status: Done
assignee:
  - '@claude'
created_date: '2026-09-12 06:38'
updated_date: '2026-09-12 10:50'
labels: []
dependencies:
  - TASK-62.2
  - TASK-62.3
  - TASK-62.4
  - TASK-62.5
modified_files:
  - scripts/bootstrap-sessions.sh
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
iTerm2에 탭 4개(implementer/reviewer/verify/logger)를 열어 각 세션을 올바른 디렉토리로 자동 기동하는 부트스트랩 스크립트. 3개 named worktree(implementer/reviewer/verify)가 없으면 git worktree add로 먼저 생성해 멱등성을 확보하고, logger는 별도 worktree 없이 메인 저장소 경로를 그대로 쓴다. 각 탭은 cd 후 claude "$(cat scripts/session-prompts/<role>.md)"로 기동되어 /loop 60m이 첫 메시지로 즉시 전송되므로, 실행 즉시 4개 세션이 자율 작업(커밋/PR 등)을 시작한다는 점을 스크립트 상단 주석으로 경고한다. 인터벌은 LOOP_INTERVAL 변수로 조정 가능하게 둔다(plan-v1 근거로 기본 60분).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 bash -n scripts/bootstrap-sessions.sh가 문법 오류 없이 통과한다
- [x] #2 implementer/reviewer/verify 3개 worktree가 없으면 git worktree add로 생성하는 멱등 로직이 있다
- [x] #3 iTerm2에 탭 4개를 열어 각각 올바른 디렉토리로 cd한 뒤 scripts/session-prompts/<role>.md 내용을 claude에 전달한다
- [x] #4 스크립트 상단에 자율 작업이 즉시 시작된다는 경고 주석과 LOOP_INTERVAL 변수(기본 60m)가 존재한다
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
scripts/bootstrap-sessions.sh 작성 완료. bash -n 통과(AC1) 확인. WORKTREES_DIR 아래 implementer-workspace/reviewer-workspace/verify-workspace 존재 여부를 확인해 없으면 git show-ref로 브랜치 존재 확인 후 git worktree add [-b] 로 멱등 생성(AC2). osascript로 iTerm2 창 1개+탭 4개를 열어 각각 cd 후 claude "$(cat scripts/session-prompts/<role>.md)" 실행 — 탭별 명령은 fragile quoting 회피를 위해 mktemp 임시 launcher 스크립트로 분리(AC3). 스크립트 최상단에 실행 즉시 4개 자율 세션이 커밋/PR을 시작한다는 경고 주석 + LOOP_INTERVAL=60m 변수 존재(AC4). frontend pnpm install 후 scripts/test-all.sh 전체 통과(프런트 vitest 0 tests pass-with-no-tests, 백엔드 gradle test NO-SOURCE BUILD SUCCESSFUL). 커밋 5f597ae2... (task/TASK-62.6 브랜치).
<!-- SECTION:FINAL_SUMMARY:END -->
