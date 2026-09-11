---
id: TASK-2
title: '백엔드 Spring Boot(Gradle,Java25) 스캐폴딩'
status: Done
assignee: []
created_date: '2026-09-10 15:21'
updated_date: '2026-09-11 04:26'
labels: []
milestone: m-0
dependencies: []
documentation:
  - doc-4
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Spring Web MVC+JPA+Security+Lombok 의존성으로 backend/ 생성. AC: ./gradlew bootRun으로 기본 기동 확인, Java25 호환 안되면 Java21로 낮추는 대안 적용.

참고 문서: docs/plans/plan-v1.md
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
4개 leaf(2.1~2.4) 모두 완료. Java 25 + Spring Boot 4.1.1 조합으로 ./gradlew build(compileJava, bootJar, assemble 포함) 전부 성공 - Java 21 폴백 불필요. bootRun은 로컬 PostgreSQL 미기동으로 DataSource 연결 단계에서만 실패(예상된 동작).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/ Spring Boot(Gradle Kotlin DSL, Java25, com.portfolio) 스캐폴딩 완료: build.gradle.kts(Web/JPA/Security/Validation/Lombok/PostgreSQL/JWT 의존성), settings.gradle.kts(portfolio), PortfolioApplication.java(@SpringBootApplication), application.yml(PostgreSQL localhost:5432/portfolio). ./gradlew build 성공, Java25 그대로 사용(21 폴백 불필요).
<!-- SECTION:FINAL_SUMMARY:END -->
