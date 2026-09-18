---
id: TASK-59
title: git-format 토큰 트레일러 실동작 검증
status: To Do
assignee: []
created_date: '2026-09-12 06:02'
updated_date: '2026-09-18 14:34'
labels:
  - governance
  - verification
milestone: m-8
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
git-format 저장소(~/githubs/git-format)의 PR #4(GF-96, post-commit 토큰 트레일러 기능)가 머지된 뒤에 착수. 이 포트폴리오 저장소 안에서 EnterWorktree로 실제 leaf task 서브에이전트 하나를 정상적으로 실행시켜, 결과 커밋 메시지에 Tokens-Used/Tool-Calls 트레일러가 실제 숫자로 붙는지 git log로 확인한다. GF-96 자체 개발 커밋들은 저장소 밖(~/githubs/git-format)에서 진행되어 트랜스크립트 project-slug 경로가 안 맞아 검증되지 못했으므로(의도된 fail-safe, 실패 아님), 이 저장소 내부의 정상 케이스에서 실제로 동작하는지 별도 확인이 필요하다. 외부 차단요인: git-format PR #4가 아직 머지되지 않았으면 이 task는 착수 불가, To Do로 대기.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 git-format PR #4 머지 확인 후, 이 저장소 안의 정상 leaf task 커밋에 Tokens-Used/Tool-Calls 트레일러가 실제로 붙는 것을 git log로 확인
<!-- AC:END -->
