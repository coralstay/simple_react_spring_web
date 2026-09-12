---
id: TASK-5.2
title: 더미 콘텐츠 JSON 작성
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 10:49'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - backend/src/main/resources/content/case-study-ko.json
parent_task_id: TASK-5
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 타입과 1:1 대응
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. frontend/src/content/types.ts의 CaseStudy 타입 트리(meta/hero/chapters.construction/interior/bridge/operations/closing)와 1:1 대응하는 backend/src/main/resources/content/case-study-ko.json을 새로 작성한다.
2. plan-v1 톤/프레이밍 원칙을 반영: 건축(2년)은 가장 가볍게, 인테리어(5년)는 가장 풍부하게, bridge는 배경→실제 운영 숙소를 잇는 리모델링 사례, operations(숙박업 3년)는 진짜 케이스 중심으로 지표/리뷰 포함. 특정 건물을 '내가 지었다'는 서사가 아니라 '여러 현장에서 배운 것'으로 정직하게 서술.
3. 이미지 URL은 라이선스가 명확한 무료 소스(Unsplash) 형태의 URL로 채운다.
4. JSON을 유효성 검사(cat | python3 -m json.tool 또는 jq)로 문법 오류 없는지 확인하고, types.ts의 모든 필드가 JSON에 1:1로 대응하는지 수동 대조한다.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
backend/src/main/resources/content/case-study-ko.json 신규 작성(더미 콘텐츠). frontend/src/content/types.ts의 CaseStudy 타입 트리 전체(meta/hero/chapters.{construction,interior,bridge,operations}/closing)와 키 집합을 python3 스크립트로 재귀 대조해 1:1 대응 확인(root/meta/hero/hero.summaryStats[]/chapters/construction/construction.onSiteLessons[]/interior/interior.materialsHandled[]/interior.craftDetails[]/interior.lessonsCarriedForward[]/bridge/bridge.renovation/operations/operations.spaceDecisions[]/operations.metrics[]/operations.reviewHighlights[]/closing 전부 OK). python3 -m json.tool로 문법 유효성 확인. plan-v1 톤 원칙 반영: 건축(2년) 챕터는 가장 가볍게(3개 lesson), 인테리어(5년)는 가장 풍부하게(자재3+디테일2+계승레슨2), '이 숙소를 지었다'가 아니라 '여러 현장에서 배운 것'으로 서술. 이미지는 Unsplash URL(라이선스 명확한 무료 소스)만 사용. scripts/test-all.sh 실행: 프런트엔드 통과, 백엔드는 이 샌드박스에 Java 25 툴체인이 없어 ':compileTestJava' 단계에서 실패(TASK-1.6 작업 때와 동일한 사전 존재 환경 한계, JSON 리소스 파일과 무관 — Gradle 컴파일 자체가 안 되는 단계라 이 leaf의 변경과는 근본적으로 무관).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
backend/src/main/resources/content/case-study-ko.json 한 파일만 새로 작성했다. frontend/src/content/types.ts의 CaseStudy 타입 전체 트리와 키를 재귀적으로 대조하는 python 스크립트로 1:1 대응(AC #1)을 검증했다 — 모든 하위 객체(meta, hero, hero.summaryStats[], chapters.construction(+onSiteLessons[]), chapters.interior(+materialsHandled[]/craftDetails[]/lessonsCarriedForward[]), chapters.bridge(+renovation), chapters.operations(+spaceDecisions[]/metrics[]/reviewHighlights[]), closing)가 OK로 확인됐다. python3 -m json.tool로 JSON 문법도 유효함을 확인했다. plan-v1의 톤 원칙(건축 챕터는 가장 가볍게, 인테리어는 가장 풍부하게, '지었다'가 아닌 '배웠다' 서술, bridge는 실제 리모델링 사례로 배경과 케이스를 연결, operations는 지표+리뷰 포함)을 반영했고 이미지는 Unsplash 무료 라이선스 URL만 사용했다. scripts/test-all.sh 실행 결과 프런트엔드는 통과했고, 백엔드는 이 샌드박스에 Java 25 툴체인이 없어(:compileTestJava 단계에서 실패) 실행 전부터 막히는 사전 존재 환경 한계로, JSON 리소스 파일 추가와는 무관함을 확인했다(TASK-1.6에서도 동일 현상 확인됨).
<!-- SECTION:FINAL_SUMMARY:END -->
