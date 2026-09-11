---
id: TASK-5.1
title: 콘텐츠 타입 정의
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 05:37'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - frontend/src/content/types.ts
parent_task_id: TASK-5
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 CaseStudy 인터페이스
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. plan-v1.md의 콘텐츠 데이터 모델 섹션을 기준으로 frontend/src/content/types.ts에 CaseStudy 및 하위 인터페이스(Meta, Hero, SummaryStat, Chapters(Construction/Interior/Bridge/Operations), Closing 등) TypeScript 타입 정의 작성
2. pnpm build(tsc -b)로 타입 컴파일 오류 없는지 검증
3. TASK-5.1 AC #1(CaseStudy 인터페이스) 체크 후 Done 처리
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
pnpm build(tsc -b && vite build) 성공으로 CaseStudy 인터페이스 및 하위 타입 컴파일 검증. pnpm lint(oxlint) 클린. scripts/test-all.sh 전체 실행은 이 환경에서 프런트(테스트 파일 아직 없음 — TASK-35/36 범위)와 백엔드(로컬에 Java 25 툴체인 미설치, Gradle 자동 프로비저닝 미설정 — 환경 이슈, TASK-2/plan-v1 기술 리스크에 이미 기재됨) 두 지점 모두 이 leaf task와 무관한 기존 원인으로 실패함을 확인. 이 task는 frontend/src/content/types.ts 단일 파일만 수정.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/content/types.ts에 CaseStudy 인터페이스(meta/hero/chapters(construction·interior·bridge·operations)/closing)와 하위 타입을 plan-v1.md 콘텐츠 데이터 모델 섹션 그대로 정의. 검증: pnpm build(tsc -b && vite build) exit 0, pnpm lint(oxlint) 클린. scripts/test-all.sh 전체 실행 결과는 프런트(테스트 파일 부재, TASK-35/36 범위)·백엔드(환경에 Java 25 툴체인 없음, plan-v1 기술 리스크 항목) 두 곳 모두 이 task와 무관한 기존 원인으로 실패 — 근거는 Implementation Notes 참고.
<!-- SECTION:FINAL_SUMMARY:END -->
