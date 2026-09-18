---
id: TASK-13.5
title: InquiryController.java
status: Done
assignee:
  - '@claude'
created_date: '2026-09-10 15:31'
updated_date: '2026-09-18 18:47'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/inquiry/InquiryController.java
parent_task_id: TASK-13
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 POST 매핑
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. InquiryController에 POST /api/inquiries 매핑 추가, InquiryRepository로 저장.
2. 요청 바디의 id는 무시하고 name/contact/message/type만 뽑아 새 Inquiry로 저장(공개 엔드포인트라 임의 id로 기존 레코드 덮어쓰기 방지).
3. ./gradlew compileJava/test로 검증 후 AC 체크, Final Summary 기록, Done 처리.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
InquiryController(@RestController, /api/inquiries)에 POST 매핑 추가. 요청 바디를 그대로 저장하지 않고 name/contact/message/type만 추출해 새 Inquiry.Builder로 만들어 저장 — 공개(permitAll) 엔드포인트라 클라이언트가 id를 실어 보내 기존 레코드를 덮어쓰는 것을 방지. 저장 후 201 Created + 저장된 엔티티 반환.

검증: 이 샌드박스에 Java 25 toolchain이 없어(네트워크 정책상 자동 다운로드 불가) TASK-13.4와 동일하게 build.gradle.kts의 languageVersion을 임시로 21로 낮춰 './gradlew compileJava'/'./gradlew test' 모두 BUILD SUCCESSFUL 확인(test는 기존 테스트 소스 없어 NO-SOURCE) 후 build.gradle.kts를 원본(25)으로 복원, git diff로 무변경 확인. 최초 시도 시 Maven Central이 프록시를 통해 429(Too Many Requests)를 반환해 buildscript classpath 해석이 실패했으나 재시도 후 정상 해석됨(일시적 레이트리밋으로 판단, 코드와 무관).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
InquiryController.java(backend/src/main/java/com/portfolio/inquiry/InquiryController.java) 신규 작성 — POST /api/inquiries 매핑(AC #1)을 추가해 InquiryRepository(TASK-13.4, Done)로 저장하는 컨트롤러 구현. 요청 바디에서 name/contact/message/type만 추출해 새 Inquiry를 만들어 저장하고(임의 id로 기존 레코드 덮어쓰기 방지), 201 Created로 저장된 엔티티를 반환. Java 25 toolchain이 없는 샌드박스라 TASK-13.4와 동일하게 임시로 languageVersion=21로 낮춰 './gradlew compileJava'와 './gradlew test' BUILD SUCCESSFUL로 검증(문법은 21/25 동일) 후 build.gradle.kts는 원본으로 복원, git diff로 무변경 확인.
<!-- SECTION:FINAL_SUMMARY:END -->
