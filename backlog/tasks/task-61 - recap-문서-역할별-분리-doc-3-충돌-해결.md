---
id: TASK-61
title: recap 문서 역할별 분리 (doc-3 충돌 해결)
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
원인: 기존 backlog doc-3('진행 로그 (recap 기록)')는 implementer 대화형 세션, 클라우드 cron, reviewer, verify, logger 모든 역할이 공통으로 append하는 단일 파일이라, 서로 다른 브랜치가 파일 끝 근방을 동시에 수정해 머지 시 구조적으로 충돌한다(TASK-53 updated_date 역행 사고와 같은 계열의 '여러 쓰기 주체가 같은 파일 공유' 문제). worktree 디렉토리 분리는 이 문제를 해결하지 않는다 — 이건 로컬 레이스가 아니라 머지 시점 충돌이기 때문. 해결: backlog doc create로 4개 신규 doc('진행 로그 (implementer)', '(reviewer)', '(verify)', '(logger)')을 생성하고, 각 역할은 자기 자신의 recap doc에만 append한다는 규칙을 plan-v17에 명시한다. 기존 doc-3는 과거 기록 보존을 위해 그대로 두되 신규 append를 중단(동결)한다. implementer 역할은 대화형 세션과 클라우드 cron이 이름을 공유해 이론상 잔여 충돌 가능성이 남으나, 실제로 재발하면 그때 추가로 (implementer-interactive)/(implementer-cron)으로 더 쪼갠다(과설계 방지, 필요시 확장 원칙).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 backlog doc 4개(진행 로그 implementer/reviewer/verify/logger) 신규 생성
- [ ] #2 doc-3 동결(신규 append 중단) 안내 및 각 역할이 자기 recap doc에만 append하는 규칙을 plan-v17에 명시
<!-- AC:END -->
