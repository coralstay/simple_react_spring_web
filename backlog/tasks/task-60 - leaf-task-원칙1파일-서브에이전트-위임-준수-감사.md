---
id: TASK-60
title: leaf task 원칙(1파일/서브에이전트 위임) 준수 감사
status: To Do
assignee: []
created_date: '2026-09-12 06:02'
updated_date: '2026-09-18 14:34'
labels:
  - governance
  - audit
milestone: m-8
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
지금까지 생성된 backlog task 전체(172개, TASK-1~TASK-54 계열)를 -p(parent)/modified_files 필드 기준으로 스캔하여, leaf task가 실제로 1개 파일만 수정 범위로 갖고 있는지, 그리고 실행이 항상 서브에이전트 위임으로 이루어졌는지(recap 로그 doc-3 등과 대조) 확인한다. 위반 사례가 있으면 목록화하고 필요 시 분리/수정한다. 토큰 측정(Tokens-Used/Estimated)이 정확하려면 이 원칙이 실제로 지켜지고 있어야 한다는 전제를 감사로 확인.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 backlog task 전체를 -p/modified_files 기준으로 스캔, 1파일 초과 leaf 위반 사례 목록화 및 필요 시 수정
<!-- AC:END -->
