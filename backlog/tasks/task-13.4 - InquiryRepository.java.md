---
id: TASK-13.4
title: InquiryRepository.java
status: Done
assignee:
  - '@claude'
created_date: '2026-09-10 15:31'
updated_date: '2026-09-12 10:43'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/inquiry/InquiryRepository.java
parent_task_id: TASK-13
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 기본 CRUD
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Spring Data JPA repository interface JpaRepository<Inquiry, Long> 생성, 기본 CRUD 제공 확인.
2. 컴파일/빌드로 검증(./gradlew compileJava).
3. AC #1 체크, Final Summary 기록 후 Done 처리.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
InquiryRepository extends JpaRepository<Inquiry, Long>로 기본 CRUD 제공. 검증: 이 샌드박스에 Java 25 toolchain이 없고(only JDK21 설치, adoptium.net 다운로드는 프록시 정책으로 차단) foojay resolver도 미설정이라 실제 languageVersion=25로는 빌드 불가 — 로컬 검증 목적으로만 build.gradle.kts의 languageVersion을 21로 임시 변경해 './gradlew compileJava'와 './gradlew test' 둘 다 BUILD SUCCESSFUL 확인(test는 기존 테스트 소스가 없어 NO-SOURCE) 후, 변경사항을 커밋 전 원본(25)으로 복원함(git diff로 build.gradle.kts 무변경 확인). 인터페이스 문법은 21/25 동일하므로 이 검증으로 충분하다고 판단.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Inquiry.java(TASK-13.3, Done)에 대한 Spring Data JPA 리포지토리 InquiryRepository(extends JpaRepository<Inquiry, Long>)를 backend/src/main/java/com/portfolio/inquiry/InquiryRepository.java에 추가해 기본 CRUD(AC #1)를 제공. Java 25 toolchain이 없는 샌드박스라 임시로 languageVersion=21로 낮춰 './gradlew compileJava'와 './gradlew test' BUILD SUCCESSFUL로 검증(문법은 21/25 동일) 후 build.gradle.kts는 원본으로 복원, git diff로 무변경 확인.
<!-- SECTION:FINAL_SUMMARY:END -->
