---
id: TASK-62.3
title: scripts/session-prompts/reviewer.md 작성
status: Done
assignee:
  - '@claude'
created_date: '2026-09-12 06:38'
updated_date: '2026-09-12 10:41'
labels: []
dependencies: []
modified_files:
  - scripts/session-prompts/reviewer.md
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
reviewer 세션(worktree-reviewer-workspace, 세션명 simple-web-aplication-reviewer)을 claude "$(cat scripts/session-prompts/reviewer.md)"로 기동할 때 첫 메시지로 들어갈 프롬프트 원문. TASK-62 설명 중 reviewer 절차(머지 여부 확인 plan-v13 → 미검토 마일스톤/PR 확인 → /code-review high 수행 → backlog doc create -p reviews 기록 + 기존 doc 링크 포함해서 task edit --doc 갱신 plan-v11 → implementer에 SendMessage 통보 → 리뷰 판단 근거를 logger 세션에 SendMessage로 원문 전달)를 명령형 지시문으로 옮긴다.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 파일 맨 앞이 '/loop 60m '으로 시작한다
- [x] #2 머지 여부 확인(plan-v13), /code-review high 수행, backlog doc create -p reviews 기록, 기존 doc 링크 포함해서 task edit --doc 갱신(plan-v11), implementer에 SendMessage 통보 단계가 모두 명령형으로 포함된다
- [x] #3 리뷰 판단 근거를 logger 세션에 SendMessage로 원문 전달하는 단계가 포함된다
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
scripts/session-prompts/reviewer.md 작성 완료. 파일은 '/loop 60m '으로 시작하며, plan-v13(fetch+PR 머지여부 확인)→backlog board/PR 미검토 확인→/code-review high→backlog doc create -p reviews -t specification 기록→plan-v11(--doc은 set이므로 기존 documentation 전부 재조회 후 신규와 함께 한 번에 지정)→implementer SendMessage 통보→logger에 판단근거 원문 SendMessage 전달→plan-v12(전체 40자 커밋 해시 인용) 순서로 명령형 지시문을 담았다. scripts/test-all.sh 통과 확인(frontend vitest 0 tests / backend gradle BUILD SUCCESSFUL). 커밋 fc16ab5c5fc8b89dee3ff02ade6376d794d85284.
<!-- SECTION:FINAL_SUMMARY:END -->
