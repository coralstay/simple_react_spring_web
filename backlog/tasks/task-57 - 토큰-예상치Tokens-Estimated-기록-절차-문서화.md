---
id: TASK-57
title: 토큰 예상치(Tokens-Estimated) 기록 절차 문서화
status: To Do
assignee: []
created_date: '2026-09-12 06:02'
updated_date: '2026-09-18 14:34'
labels:
  - docs
  - governance
milestone: m-8
dependencies:
  - TASK-55
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/plans/plan-v18.md 신규 작성. 커밋 시점 실제 토큰 사용량(Tokens-Used, git-format GF-96이 이미 자동 기록)과 별도로, 오케스트레이터(implementer)가 leaf task를 서브에이전트에 위임하는 시점에 과거 유사 규모 task의 실제 기록(예: TASK-15.1 138640, TASK-4.3 51202, GF-96 109463)을 참고해 대략치를 산정하고 backlog task의 notes/설명에 'Tokens-Estimated: ~N' 형태로 남기는 절차를 정의한다. task 완료(Final Summary) 시점에 실제값과 예상값을 나란히 비교 기록한다. 이 절차의 전제조건인 'leaf task = 1파일, 실행은 항상 서브에이전트 위임'(plan-v1 불변식)이 실제로 지켜지고 있어야 함을 명시.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/plans/plan-v18.md 작성 완료: Tokens-Estimated 산정 절차 + Final Summary에서 실제값과 비교 기록하는 절차 명시
<!-- AC:END -->
