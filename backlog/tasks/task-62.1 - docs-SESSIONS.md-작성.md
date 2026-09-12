---
id: TASK-62.1
title: docs/SESSIONS.md 작성
status: In Progress
assignee:
  - '@claude'
created_date: '2026-09-12 06:37'
updated_date: '2026-09-12 10:39'
labels: []
dependencies: []
references:
  - TASK-55
  - TASK-61
modified_files:
  - docs/SESSIONS.md
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

다중 세션(implementer/reviewer/verify/logger) 운영 방법을 설명하는 신규 문서. TASK-62 부모 설명의 '산출물 1' 섹션 전체를 그대로 반영한다. 루트 README.md가 아니라 docs/SESSIONS.md로 만드는 이유: TASK-42.1이 나중에 채용용 루트 README.md를 작성할 예정이라 충돌 방지.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 4개 세션(implementer/reviewer/verify/logger) 각각의 worktree 경로/브랜치(또는 무worktree 이유)가 문서에 명시된다
- [ ] #2 각 세션이 /loop 사이클마다 수행하는 절차가 plan-v3/v4/v5/v8/v10/v11/v12/v13 근거와 함께 구체적으로 서술된다
- [ ] #3 logger 세션이 판단하지 않고 raw 데이터만 logs/raw-session-log.md에 append하며 git으로 추적된다는 점이 명시된다
- [ ] #4 backlog/ 하위 디렉토리(tasks/milestones/drafts/archive/docs-reviews/docs-logs/decisions/completed/config.yml)별 역할과 실제 활용 여부가 표 또는 목록으로 정리된다
- [ ] #5 TASK-55/TASK-61과 스코프가 겹치는 지점, 특히 TASK-61 AC #1(logger도 backlog doc을 가진다는 전제)이 수정 필요하다는 점이 명시된다

<!-- AC:END -->
