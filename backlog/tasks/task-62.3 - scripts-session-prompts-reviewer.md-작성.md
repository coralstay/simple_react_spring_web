---
id: TASK-62.3
title: scripts/session-prompts/reviewer.md 작성
status: In Progress
assignee:
  - '@claude'
created_date: '2026-09-12 06:38'
updated_date: '2026-09-12 06:42'
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

- [ ] #1 파일 맨 앞이 '/loop 60m '으로 시작한다
- [ ] #2 머지 여부 확인(plan-v13), /code-review high 수행, backlog doc create -p reviews 기록, 기존 doc 링크 포함해서 task edit --doc 갱신(plan-v11), implementer에 SendMessage 통보 단계가 모두 명령형으로 포함된다
- [ ] #3 리뷰 판단 근거를 logger 세션에 SendMessage로 원문 전달하는 단계가 포함된다

<!-- AC:END -->
