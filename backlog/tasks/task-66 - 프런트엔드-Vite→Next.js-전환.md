---
id: TASK-66
title: 프런트엔드 Vite→Next.js 전환
status: Done
assignee: []
created_date: '2026-09-18 14:47'
updated_date: '2026-09-18 14:51'
labels:
  - frontend
  - architecture
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
프런트엔드 빌드 도구를 Vite(현재)에서 Next.js로 전환한다(사용자 지시, 2026-09-18).

## 렌더링 모드 결정 (사용자 확인 완료, 2026-09-18)

**정적 export 모드**(`next.config.js`의 `output: "export"`)로 확정. 빌드 산출물이 Vite의
`dist/`와 동일하게 순수 정적 파일(`out/`)이 되어, 기존 배포 아키텍처(Spring Boot 단일 jar가
`frontend/dist`를 정적 리소스로 서빙)를 그대로 유지한다. App Router의 서버 컴포넌트 데이터
페칭/API 라우트/ISR 등 Next.js 서버 전용 기능은 쓰지 않는다 — 사실상 라우팅/번들러만
Next.js(App Router)로 바뀌는 것이고, 배포/백엔드 아키텍처는 변경 없음.

## 현재 상태(조사 결과)

- `frontend/`는 `pnpm create vite frontend --template react-ts`로 스캐폴딩된 순수 Vite+React+TS SPA. 엔트리는 `index.html` + `src/main.tsx`.
- 이미 M2(공개 케이스 스터디 페이지)에서 다음 컴포넌트/훅이 Vite 기준으로 구현·머지됨: Hero.tsx, Intro.tsx, ConstructionChapter.tsx, MaterialsHandled/CraftDetails/LessonsCarriedForward.tsx(InteriorChapter 하위), BridgeSection.tsx, OperationsChapter.tsx, Closing.tsx, useInView.ts, useScrollProgress.ts. 프레임워크 비의존적인 일반 React 컴포넌트/훅이라 대부분 그대로 포팅 가능하나, App Router 기준으로는 훅을 쓰는 컴포넌트에 `"use client"` 지시어 추가 필요.
- `frontend/vite.config.ts`는 로컬 개발 중 `/api`를 `localhost:8080`(Spring Boot)으로 프록시 — Next.js에서는 `next.config.js`의 `rewrites()`로 대체.
- M8(빌드 결함 수정) 마일스톤의 TASK-54(vite.config.ts TS2769 빌드 오류)는 Vite가 없어지면 무효화됨 — 전환 완료 시 TASK-63과 같은 방식으로 archive 처리.
- `docs/plans/plan-v1.md` "기술 스택 & 구조" 섹션이 Vite 스캐폴딩 명령을 명시하고 있어 갱신 필요(직접 수정 가능, TASK-64/plan-v16 참고).

## 다음 단계

실행 시점에 아래를 파일 단위 leaf task로 쪼개 진행: (1) next.config.js+package.json 스캐폴딩 교체, (2) App Router 엔트리(app/layout.tsx, app/page.tsx) 구성, (3) 기존 컴포넌트/훅에 "use client" 추가 포팅, (4) /api 프록시를 rewrites로 대체, (5) vitest 설정 유지 확인, (6) TASK-54 archive, (7) plan-v1.md 갱신.

## 우선순위 관련 미확인 사항

M9(워크플로 거버넌스, m-8)를 먼저 처리하기로 사용자가 별도로 지시했음 — 이 TASK-66(Next.js
전환)을 M9보다 먼저/나중에 할지는 아직 명시적으로 정해지지 않음. M2가 이미 Vite 기준으로
15/31 진행된 상태라, 더 진행하기 전에 전환하는 편이 재작업을 줄이지만 이건 사용자 확인 필요.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Next.js 렌더링 모드 결정(정적 export vs Node 서버) — 사용자 확인 완료, 정적 export로 확정
- [x] #2 영향 범위 조사 기록(기존 Vite 산출물, M2 완료 컴포넌트, TASK-54/M8, plan-v1.md) 및 다음 단계(leaf task 분해 항목) 문서화
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Vite→Next.js 전환 결정 기록 완료: 정적 export 모드로 확정(사용자 확인, 기존 Spring Boot 단일 jar 배포 아키텍처 유지). 영향 범위(M2 완료 컴포넌트 포팅 필요, TASK-54/M8 archive 대상, plan-v1.md 갱신 필요) 문서화. 실제 코드 마이그레이션은 이 task의 범위 밖 — 착수 시점에 파일 단위 leaf task(TASK-66.1 등)로 별도 분해해서 진행. 커밋 aad98a7 (task/TASK-66).
<!-- SECTION:FINAL_SUMMARY:END -->
