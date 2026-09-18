---
id: TASK-58
title: task-graph 생성 스크립트 작성 + 전체 초기 문서 생성
status: To Do
assignee: []
created_date: '2026-09-12 06:02'
updated_date: '2026-09-18 14:34'
labels:
  - scripts
  - governance
milestone: m-8
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
scripts/generate-task-graph.sh (또는 .py) 신규 작성 — backlog task/milestone 전체를 읽어 (a) 마일스톤 단위 그래프(노드=M1~M9, 엣지=마일스톤간 의존관계, 예: M9→M2)와 (b) 태스크 단위 그래프(마일스톤별 Mermaid subgraph 안에 dependencies/parent_task_id 기반 task 의존관계) 둘 다 생성한다. 스크립트 실행 결과로 M1~M9 전체 backlog(완료/진행중/신규 마일스톤 모두 포함, M6은 TASK-63으로 archive되어 제외)를 대상으로 docs/plans/task-graph.md를 최초 생성한다. 이후 신규 backlog task가 하나라도 생성될 때마다 즉시 이 스크립트를 재실행해 문서를 갱신하는 규칙을 plan-v17에 절차로 고정한다(leaf task 원칙: 이 task는 스크립트 파일 1개 작성이 범위, 서브에이전트에 위임).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 scripts/generate-task-graph.sh(또는 .py) 작성 완료, 마일스톤 단위 그래프+태스크 단위 그래프 둘 다 생성
- [ ] #2 M1~M9 전체 backlog를 대상으로 docs/plans/task-graph.md 최초 생성 완료
<!-- AC:END -->
