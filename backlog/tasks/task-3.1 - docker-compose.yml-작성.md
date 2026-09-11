---
id: TASK-3.1
title: docker-compose.yml 작성
status: Done
assignee: []
created_date: '2026-09-10 15:30'
updated_date: '2026-09-11 04:26'
labels: []
dependencies: []
documentation:
  - doc-4
modified_files:
  - docker-compose.yml
parent_task_id: TASK-3
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 btree_gist 확장 활성화
<!-- AC:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-09-10 23:17
---
btree_gist 확장 활성화는 이 compose 파일 범위가 아니라 TASK-19.1의 Flyway/Liquibase 마이그레이션 파일에서 처리하기로 결정 — 이 AC는 TASK-19.1로 이관되어 여기서는 미체크 상태로 남긴다.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
postgres:16 서비스 하나(컨테이너명, 이미지, env, 5432 포트, named volume)만 정의하는 최소 docker-compose.yml 작성 완료. docker compose config/up -d/down 모두 로컬에서 검증함. btree_gist는 TASK-19.1로 이관.
<!-- SECTION:FINAL_SUMMARY:END -->
