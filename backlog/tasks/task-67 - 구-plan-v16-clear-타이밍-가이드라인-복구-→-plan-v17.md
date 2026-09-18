---
id: TASK-67
title: 구 plan-v16(/clear 타이밍 가이드라인) 복구 → plan-v17
status: Done
assignee: []
created_date: '2026-09-18 14:55'
updated_date: '2026-09-18 14:58'
labels:
  - docs
  - governance
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
task/TASK-56-clear-timing 브랜치(원격에만 존재, 2026-09-12부터 미병합 상태로 방치)에 '/clear 타이밍 가이드라인' 내용의 plan-v16.md가 있었으나, 같은 브랜치의 plan-v14/v15.md는 다른 경로(PR #30, task/TASK-55-location-clarity)로 먼저 병합되고 이 plan-v16은 rebase abort 사고로 유실된 채 브랜치에만 남아있었다. 오늘 TASK-64에서 별도 주제(취업 포트폴리오→실무 적용 전환)로 plan-v16.md를 이미 사용했으므로, 이 구 내용은 번호를 plan-v17로 옮겨 복구한다. TASK-55(M9)가 이미 'plan-v17.md 작성'을 AC로 갖고 있어 번호 충돌 — TASK-55는 plan-v18로 갱신 필요.
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
task/TASK-56-clear-timing(원격에만 존재, 미병합)에 방치돼있던 '/clear 타이밍 가이드라인'을 docs/plans/plan-v17.md로 복구. TASK-64가 plan-v16을 다른 용도로 선점해서 번호 충돌이 있었음 — v17로 재배정. 이미 plan-v17을 참조 중이던 TASK-55(제목/설명/AC)·TASK-56·TASK-58·TASK-61(AC까지) 및 docs/SESSIONS.md를 plan-v18 참조로 일괄 수정. TASK-61 AC #1은 SESSIONS.md가 이미 지적해뒀던 대로 logger=logs/raw-session-log.md(backlog doc 아님)로 정정. 커밋 5619189 (task/TASK-67).
<!-- SECTION:FINAL_SUMMARY:END -->
