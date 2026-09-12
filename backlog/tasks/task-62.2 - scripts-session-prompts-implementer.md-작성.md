---
id: TASK-62.2
title: scripts/session-prompts/implementer.md 작성
status: In Progress
assignee:
  - '@claude'
created_date: '2026-09-12 06:37'
updated_date: '2026-09-12 06:42'
labels: []
dependencies: []
modified_files:
  - scripts/session-prompts/implementer.md
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
implementer 세션(이 워크트리)을 claude "$(cat scripts/session-prompts/implementer.md)"로 기동할 때 첫 메시지로 들어갈 프롬프트 원문. TASK-62 설명 중 implementer 절차(git fetch/pull 확인 plan-v13 → backlog board view로 다음 task 확인, 직전 마일스톤 reviewer+verify 양쪽 PASS 전 다음 마일스톤 금지 plan-v10 → leaf task는 항상 서브에이전트 위임 전 부모+마일스톤 확인 plan-v8 → 함수 단위 커밋 git-format+Task-Id → 마일스톤 Done 시 reviewer/verify SendMessage 요청 후 backlog doc 기록 plan-v3/v4/v5 → 전체 커밋 해시 기록 plan-v12 → 판단 근거를 logger 세션에 SendMessage로 원문 전달)를 명령형 지시문으로 옮긴다.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 파일 맨 앞이 '/loop 60m '으로 시작한다
- [ ] #2 git fetch/pull 확인, backlog board view 기반 다음 task 선정, 마일스톤 게이트(plan-v10), leaf task 서브에이전트 위임 전 부모+마일스톤 확인(plan-v8), 함수 단위 커밋(git-format+Task-Id), 마일스톤 Done 시 리뷰/검증 요청(plan-v3/v4/v5), 전체 커밋 해시 인용(plan-v12) 단계가 모두 명령형으로 포함된다
- [ ] #3 판단 근거를 logger 세션에 SendMessage로 원문 전달하는 단계가 포함된다
<!-- AC:END -->
