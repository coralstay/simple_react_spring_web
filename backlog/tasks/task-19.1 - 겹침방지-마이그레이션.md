---
id: TASK-19.1
title: 겹침방지 마이그레이션
status: To Do
assignee: []
created_date: '2026-09-10 15:32'
updated_date: '2026-09-11 04:27'
labels: []
dependencies: []
modified_files:
  - backend/src/main/resources/db/migration/V2__booking_exclude_constraint.sql
parent_task_id: TASK-19
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 btree_gist EXCLUDE
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
TASK-3.1에서 이연된 btree_gist 확장 활성화가 여기서 실제로 이뤄진다 (CREATE EXTENSION IF NOT EXISTS btree_gist;를 이 마이그레이션 파일 안에 포함). 마이그레이션 도구(Flyway/Liquibase) 자체가 아직 backend에 추가되지 않았다면 이 task에서 함께 추가할 것 — reviewer 피드백(doc-4).
<!-- SECTION:NOTES:END -->
