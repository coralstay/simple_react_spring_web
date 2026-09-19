---
id: TASK-17.1
title: Room.java
status: Done
assignee: []
created_date: '2026-09-10 15:32'
updated_date: '2026-09-19 11:42'
labels: []
milestone: m-2
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/dashboard/room/Room.java
parent_task_id: TASK-17
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 JPA 엔티티
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/dashboard/room/Room.java 생성 (commit 2ce16aaee3c02bb6019d0327d355b85c71662226, base main f05786a7601573fffb0393951c600873012f3744). 운영 대시보드 객실/유닛 JPA 엔티티: id(IDENTITY), name/capacity/builtYear(모두 not null), renovatedYear(nullable, 리모델링 이력 없으면 null — 대시보드에서 "리모델링 후 N년 경과" 표시에 사용, plan-v1 데이터 모델 섹션 반영). Inquiry.java와 동일한 Lombok 패턴(@Getter/@Setter/@NoArgsConstructor/@AllArgsConstructor/@Builder), @Table(name="rooms"). 검증: cd backend && ./gradlew compileJava -> BUILD SUCCESSFUL, ./gradlew test -> BUILD SUCCESSFUL(NO-SOURCE, 백엔드 테스트 아직 없음). RoomRepository(TASK-17.2)/RoomController(TASK-17.3)/RoomService(TASK-17.4)는 후속 leaf task로 남김.
<!-- SECTION:FINAL_SUMMARY:END -->
