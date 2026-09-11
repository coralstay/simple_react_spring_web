---
id: TASK-4
title: claude-rails 프로젝트 설정
status: Done
assignee: []
created_date: '2026-09-10 15:21'
updated_date: '2026-09-10 23:37'
labels: []
milestone: m-0
dependencies: []
documentation:
  - doc-2
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
.claude-rails.json 작성(testCommand=scripts/test-all.sh), scripts/test-all.sh(프런트+백엔드 테스트 실행) 작성. AC: 커밋 시 pre_commit_check 훅이 이 스크립트로 검증됨.

참고 문서: docs/plans/plan-v1.md
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
TASK-4.1(.claude-rails.json)과 TASK-4.2(scripts/test-all.sh)를 각각 leaf 커밋으로 완료. testCommand가 scripts/test-all.sh를 가리키도록 등록했고, 해당 스크립트는 frontend/backend 존재 여부를 확인해 있으면 pnpm test(또는 vitest --run)/gradlew test를 실행하고 없으면 skip 메시지를 출력한다. bash scripts/test-all.sh 실행 결과 exit 0으로 정상 동작 확인(현재 worktree엔 frontend/backend 미존재, 둘 다 skip).
<!-- SECTION:FINAL_SUMMARY:END -->
