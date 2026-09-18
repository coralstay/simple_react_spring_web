---
id: TASK-55
title: plan-v18.md 작성 (worktree 재확인 + 마일스톤전환 PR게이트)
status: To Do
assignee: []
created_date: '2026-09-12 06:02'
updated_date: '2026-09-18 14:56'
labels:
  - docs
  - governance
milestone: m-8
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/plans/plan-v18.md 신규 작성 + docs/plans/README.md 버전표 갱신. (번호 변경 이력: 애초 plan-v17로 계획됐으나, TASK-67에서 미병합 방치돼있던 '/clear 타이밍 가이드라인'을 plan-v17로 복구하며 이 task는 plan-v18로 재배정됨.)
내용 2가지(모두 이번 M9 마일스톤 결정사항, 원래 있던 3번째 항목 'M6→M7 순서 의존성'은 M6 마일스톤이 TASK-63으로 archive되며 무효화되어 제외):
1) worktree 분리(implementer/reviewer/verify/logger 각자 독립 EnterWorktree) + PR 머지 절차(implementer가 PR 오픈, 사용자가 직접 머지, 스쿼시 금지)는 plan-v6과 동일한 기존 규칙임을 재확인 문서화.
2) 신규: 마일스톤 전환은 reviewer+verify PASS 확보만으로는 부족하고, implementer가 코드 변경 없는 전용 '다음 마일스톤 M-N 진행?' PR(마일스톤 요약+PASS 문서 링크 포함)을 올려 그 PR이 origin/main에 실제 머지된 경우에만 다음 마일스톤 task를 시작하도록 규칙 추가. 이 규칙은 implementer(오케스트레이터) 역할에만 적용, reviewer/verify/logger 역할 자체는 불변.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/plans/plan-v18.md 작성 완료(worktree 재확인+마일스톤전환 PR게이트 2가지 모두 포함)
- [ ] #2 docs/plans/README.md 버전표에 v18 행 추가
<!-- AC:END -->
