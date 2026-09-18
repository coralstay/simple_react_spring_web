---
id: TASK-13.2
title: ContactForm.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-18 00:00'
labels: []
milestone: m-1
dependencies: []
documentation:
  - doc-3
modified_files:
  - frontend/src/sections/ContactForm.tsx
parent_task_id: TASK-13
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 문의폼 제출
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/sections/ContactForm.tsx를 신규 작성. Hero.tsx/Closing.tsx(TASK-7.1/TASK-13.1, 이미 merge됨)와 동일한 컨벤션(함수형 컴포넌트 + named function + export default, 최상위 const CSSProperties 객체, clamp() 미사용 구간은 고정값, section에 aria-label)을 따름. 별도 export 타입/props 없이 자체 상태(useState)로 완결된 컴포넌트.

렌더 내용(AC #1, 문의폼 제출): name/contact/message/type(select: RESERVATION·GENERAL·OTHER) 4개 필드를 controlled input으로 구성. submit 시 vite dev 서버 프록시(vite.config.ts의 /api → localhost:8080)를 그대로 타는 상대경로로 `fetch("/api/inquiries", { method: "POST", ... })` 호출. 요청 바디 필드명(name/contact/message/type)은 이미 merge된 Inquiry.java(TASK-13.3, Done)의 엔티티 필드 및 InquiryType enum과 일치시켰고, 응답 형태는 아직 미merge 상태인 InquiryController.java(TASK-13.5, PR #47)의 구현(POST /api/inquiries, request body에서 동일 4개 필드만 추출해 저장, 201 CREATED 응답)을 GitHub에서 직접 읽어 그 계약에 맞춤 — PR #47은 재구현하지 않고 계약만 참고. 제출 중/성공/실패 상태를 로컬 state로 표시(성공 시 폼 초기화, 실패 시 role="alert" 메시지).

의존성 확인: TASK-6.1(CaseStudyController.java)은 CaseStudyService.java(TASK-6.2)가 아직 main에 merge되지 않아(PR #43 오픈) 같은 패키지에 컴파일 의존이 생길 위험이 있어 이번 런에서는 건너뛰고, 백엔드에 의존하지 않는 독립 프런트엔드 파일인 TASK-13.2를 선택.

검증: cd frontend && npm install(최초 1회) / npm run build(tsc -b && vite build, exit 0, dist 생성 확인) / npm run lint(oxlint, 기존 useInView.ts 경고 1건 외 새 파일 관련 경고/에러 0건) / pnpm test(vitest run --passWithNoTests, "No test files found, exiting with code 0" — TASK-1.5가 설정한 flag로 정상 종료).
<!-- SECTION:FINAL_SUMMARY:END -->
