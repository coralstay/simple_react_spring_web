---
id: TASK-6.2
title: CaseStudyService.java
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-18 14:43'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/casestudy/CaseStudyService.java
parent_task_id: TASK-6
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 JSON 로드 로직
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
backend/src/main/java/com/portfolio/casestudy/CaseStudyService.java 신규 작성. content/case-study-ko.json 리소스를 ObjectMapper.readTree로 파싱해 JsonNode로 캐시(생성자에서 1회 로드, fail-fast). types.ts의 CaseStudy 타입 트리 전체를 미러링하는 record/DTO를 별도로 만들지 않고 JsonNode로 그대로 노출 — 이 서비스는 JSON을 그대로 통과시키는 얇은 계층이라는 TASK-6 설명(JSON 리소스 로드 반환)에 맞춤. 검증: 이 샌드박스에 Java 25 툴체인이 없고(Gradle toolchain auto-provisioning 미설정, 기존 TASK-1.6/5.1/5.2에서와 동일한 사전 존재 환경 한계) Maven Central 프록시가 429(Too Many Requests)를 반환해 ./gradlew compileJava/test 모두 이 change와 무관한 이유로 실패함을 재확인(스택트레이스로 근본 원인이 SecurityConfig/CaseStudyService 코드가 아니라 toolchain 해석/의존성 다운로드 단계임을 확인). 코드 리뷰로 컴파일 대상 import(ClassPathResource, ObjectMapper, JsonNode, JsonProcessingException)가 spring-boot-starter-web 전이 의존성에 모두 포함됨을 확인.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/casestudy/CaseStudyService.java 한 파일만 신규 작성. Spring이 자동 구성하는 ObjectMapper를 주입받아 클래스패스 리소스 content/case-study-ko.json을 기동 시 1회 읽어 JsonNode로 캐시하고 getCaseStudy()로 그대로 반환한다(파싱 실패 시 기동 시점에 IllegalStateException으로 fail-fast). 타입 트리 전체를 미러링하는 다수의 DTO 클래스 대신 JsonNode를 그대로 노출해 CaseStudyController(TASK-6.1)가 손실 없이 그대로 직렬화할 수 있게 했다. 검증은 코드 리뷰로 대체했다 — 이 샌드박스는 Java 25 툴체인이 없고 이번 실행 시점엔 Maven Central 프록시가 429를 반환해 ./gradlew compileJava/test가 이 변경과 무관한 이유로 실패함을 확인(TASK-1.6/5.1/5.2에 이미 기록된 것과 동일한 환경 한계 + 이번 실행의 일시적 429). 이 leaf task는 CaseStudyService.java 단일 파일만 수정했다. 서브에이전트 위임 없이 직접 구현 — 토큰 사용량 보고 없음.
<!-- SECTION:FINAL_SUMMARY:END -->
