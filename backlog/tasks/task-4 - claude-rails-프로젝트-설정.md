---
id: TASK-4
title: claude-rails 프로젝트 설정
status: Done
assignee: []
created_date: '2026-09-10 15:21'
updated_date: '2026-09-11 04:26'
labels: []
milestone: m-0
dependencies: []
documentation:
  - doc-4
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
.claude-rails.json 작성(testCommand=scripts/test-all.sh), scripts/test-all.sh(프런트+백엔드 테스트 실행) 작성. AC: 커밋 시 pre_commit_check 훅이 이 스크립트로 검증됨.

참고 문서: docs/plans/plan-v1.md
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
최초 Done 처리 시 test-all.sh 검증이 frontend/backend가 존재하지 않는 워크트리에서 이뤄져 트리비얼하게 exit 0이 나온 것이었음(verify 세션, doc-2 참고). 실제 통합 상태에서는 frontend vitest가 '테스트 없음'을 실패로 처리해 exit 1 — 이 버그 자체는 TASK-4의 파일(.claude-rails.json, scripts/test-all.sh)이 아니라 TASK-1의 frontend/package.json 설정 문제로 확인되어 TASK-1.5로 수정 중. TASK-4.1/4.2 AC도 뒤늦게 체크 및 근거 보완함.
<!-- SECTION:FINAL_SUMMARY:END -->
