---
id: TASK-2.4
title: application.yml 초기 설정
status: Done
assignee: []
created_date: '2026-09-10 15:30'
updated_date: '2026-09-10 23:16'
labels: []
dependencies: []
modified_files:
  - backend/src/main/resources/application.yml
parent_task_id: TASK-2
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 PostgreSQL 접속정보
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
localhost:5432/portfolio, postgres/postgres 접속 정보로 PostgreSQL datasource 설정. bootRun 시 해당 접속정보로 Hibernate가 연결을 시도하는 것으로 반영 확인(실제 DB 미기동으로 연결 자체는 실패, 설정값 반영은 확인됨).
<!-- SECTION:FINAL_SUMMARY:END -->
