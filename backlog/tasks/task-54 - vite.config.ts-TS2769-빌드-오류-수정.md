---
id: TASK-54
title: vite.config.ts TS2769 빌드 오류 수정
status: To Do
assignee: []
created_date: '2026-09-12 00:53'
labels: []
milestone: m-7
dependencies: []
references:
  - >-
    https://github.com/coralstay/simple_react_spring_web/pull/17#issuecomment-5642300232
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
여러 leaf task PR(#16 Hero.tsx, #17 Intro.tsx 등)에서 반복적으로 언급된 기존(pre-existing) 이슈: frontend/vite.config.ts가 vite의 defineConfig를 사용하면서 Vitest 전용 'test' 필드를 포함해, tsc가 TS2769('test' 속성이 UserConfigExport에 없음) 오류를 내고 pnpm build 전체가 실패한다. origin/main 커밋 21aa970d25411eab501647f2daf9ed68742a10f5(및 그 이전)에서부터 재현되는, 특정 leaf task 범위 밖의 결함이라 각 PR에서 개별 수정하지 않고 넘어갔음 — 사용자 지시(PR #17 코멘트)로 정식 task화. 참고 문서: docs/plans/plan-v1.md(Vitest+RTL 테스트 전략), docs/plans/plan-v9.md(TASK-1.6, jsdom 환경 설정 시점에 test 필드가 추가됨).
<!-- SECTION:DESCRIPTION:END -->
