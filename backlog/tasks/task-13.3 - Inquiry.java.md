---
id: TASK-13.3
title: Inquiry.java
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 19:45'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/inquiry/Inquiry.java
parent_task_id: TASK-13
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 JPA 엔티티
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/inquiry/Inquiry.java 생성 (subagent 위임 구현, commit 8bf7596b8dca9eb9185f937ad809727d8b9a1c6c, base main 21aa970d25411eab501647f2daf9ed68742a10f5). POST /api/inquiries 저장 대상 JPA 엔티티: id(IDENTITY), name/contact/message(length 2000, 모두 not null), type(InquiryType enum: RESERVATION/GENERAL/OTHER, EnumType.STRING) 중첩 enum. Lombok @Getter/@Setter/@NoArgsConstructor/@AllArgsConstructor/@Builder, @Table(name="inquiries"). 공개 엔드포인트라 owner/인증 필드 없음, 감사 타임스탬프는 TASK-28에서 별도 추가 예정이라 의도적으로 제외. 검증: cd backend && ./gradlew compileJava -> BUILD SUCCESSFUL, bash scripts/test-all.sh(프런트+백엔드) 전체 통과. InquiryRepository(TASK-13.4)/InquiryController(TASK-13.5)는 후속 leaf task로 남김.
<!-- SECTION:FINAL_SUMMARY:END -->
