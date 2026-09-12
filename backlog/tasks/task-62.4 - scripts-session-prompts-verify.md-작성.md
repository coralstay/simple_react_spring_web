---
id: TASK-62.4
title: scripts/session-prompts/verify.md 작성
status: Done
assignee:
  - '@claude'
created_date: '2026-09-12 06:38'
updated_date: '2026-09-12 10:42'
labels: []
dependencies: []
modified_files:
  - scripts/session-prompts/verify.md
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
verify 세션(worktree-verify-workspace, 세션명 simple-web-application-verify)을 claude "$(cat scripts/session-prompts/verify.md)"로 기동할 때 첫 메시지로 들어갈 프롬프트 원문. TASK-62 설명 중 verify 절차(머지 여부 확인 → 실제 pull+빌드+scripts/test-all.sh 실행으로 AC/DoD 직접 확인, 문서 주장만 믿지 않음 → PASS/FAIL을 backlog doc으로 기록 → implementer에 통보 → 판단 근거를 logger 세션에 SendMessage로 원문 전달)를 명령형 지시문으로 옮긴다.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 파일 맨 앞이 '/loop 60m '으로 시작한다
- [x] #2 머지 여부 확인, 실제 pull+빌드+scripts/test-all.sh 실행, PASS/FAIL을 backlog doc으로 기록, implementer에 통보하는 단계가 모두 명령형으로 포함되고 문서 주장만으로 판단하지 말라는 지시가 포함된다
- [x] #3 판단 근거를 logger 세션에 SendMessage로 원문 전달하는 단계가 포함된다
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
scripts/session-prompts/verify.md 작성 완료. 파일 맨 앞은 '/loop 60m '으로 시작(AC1). 본문에 (1) git fetch + gh pr view --json state,headRefOid로 머지 여부 확인 후 이미 머지된 PR 브랜치에는 추가 push 금지(plan-v12/v13), (2) backlog board view + docs/reviews 기존 doc(doc-2/5/6/7/8)으로 미검증 마일스톤/PR 식별, (3) 실제 pull+빌드+scripts/test-all.sh 실행으로 AC/DoD를 직접 확인하고 task/reviewer 문서 주장을 그 자체로 증거로 받아들이지 말라는 지시, (4) backlog doc create -p reviews로 PASS(doc-6 형식)/FAIL(doc-2 형식) 기록 + --doc는 set이므로 기존 링크 전부 재나열(plan-v11), (5) implementer 세션에 SendMessage 통보를 모두 명령형으로 포함(AC2). (6) logger 세션에 판단 근거 원문을 요약 없이 SendMessage로 전달하는 단계 포함(AC3). scripts/test-all.sh 실제 실행 결과 exit 0 확인(frontend vitest --passWithNoTests 0 test files, backend gradle test NO-SOURCE).
<!-- SECTION:FINAL_SUMMARY:END -->
