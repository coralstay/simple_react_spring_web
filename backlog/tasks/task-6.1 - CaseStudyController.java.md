---
id: TASK-6.1
title: CaseStudyController.java
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-19 00:00'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - backend/src/main/java/com/portfolio/casestudy/CaseStudyController.java
parent_task_id: TASK-6
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 GET 매핑
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
backend/src/main/java/com/portfolio/casestudy/CaseStudyController.java 신규 작성. `@RestController`에
`GET /api/case-study` 매핑 하나만 두고, 생성자로 주입받은 `CaseStudyService.getCaseStudy()`가
반환하는 `JsonNode`를 DTO 변환 없이 그대로 직렬화해 반환한다(CaseStudyService의 Javadoc이 이미
예고한 설계). TASK-6.2(CaseStudyService)가 아직 main에 merge되지 않아(PR #43, open,
mergeable_state clean) 이 브랜치는 origin/task/TASK-6.2 위에 스택해서 만들었다 — main 기준으로는
CaseStudyService가 없어 컴파일이 안 되기 때문. PR #43이 먼저 머지되면 이 PR의 base를 main으로
재조정하면 된다. 검증: 이 샌드박스에 Java 25 툴체인이 없고(toolchain auto-provisioning
미설정) `./gradlew compileJava`가 toolchain 해석 단계에서 실패함을 재확인(TASK-1.6/5.1/5.2/6.2에
이미 기록된 것과 동일한 사전 존재 환경 한계, 이 변경과 무관). 코드 리뷰로 import
가용성(`RestController`, `GetMapping`, `MediaType`은 spring-boot-starter-web, `JsonNode`는
CaseStudyService가 이미 쓰는 jackson-databind 전이 의존성) 확인.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/java/com/portfolio/casestudy/CaseStudyController.java 한 파일만 신규 작성.
`CaseStudyService`를 생성자 주입받아 `GET /api/case-study`에서 `getCaseStudy()`의 `JsonNode`를
그대로 반환한다(별도 DTO 없음, `content/case-study-ko.json` 구조 손실 없이 전달). 이 leaf는
CaseStudyController.java 단일 파일만 수정했고, TASK-6.2(CaseStudyService, PR #43, 아직 main에
미merge)가 필요해 이 PR은 origin/task/TASK-6.2를 base로 스택했다. 검증은 코드 리뷰로 대체했다 —
이 샌드박스는 Java 25 툴체인이 없어 `./gradlew compileJava`가 toolchain 해석 단계에서 이 변경과
무관하게 실패함을 확인(TASK-6.2 등 기존 기록과 동일한 환경 한계). 서브에이전트 위임 없이 직접
구현 — 토큰 사용량 보고 없음.
<!-- SECTION:FINAL_SUMMARY:END -->
