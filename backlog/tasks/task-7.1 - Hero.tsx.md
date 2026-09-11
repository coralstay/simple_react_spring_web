---
id: TASK-7.1
title: Hero.tsx
status: Done
assignee: []
created_date: '2026-09-10 15:31'
updated_date: '2026-09-11 14:43'
labels: []
milestone: m-1
dependencies: []
modified_files:
  - frontend/src/sections/Hero.tsx
parent_task_id: TASK-7
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 요약지표+CTA
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. frontend/src/sections/Hero.tsx 생성: CaseStudyHero 타입(props)을 받아 풀블리드 배경 이미지(heroImageUrl) + headline/subheadline + summaryStats 배지 + 예약문의 CTA 버튼 렌더링. 2. 반응형 CSS(모바일 폭 포함, 별도 CSS 모듈 없이 인라인 style 또는 index.css 확장 없이 컴포넌트 자체 스타일로 최소 처리). 3. Hero.test.tsx는 TASK-36.2에서 별도로 다룸 — 이 leaf는 컴포넌트 파일 1개만. 4. pnpm build로 타입체크 통과 확인.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
구현: frontend/src/sections/Hero.tsx 생성(CaseStudyHero props로 풀블리드 배경+headline/subheadline+summaryStats 배지+예약문의 CTA, inline CSSProperties의 clamp()/relative unit으로 반응형 처리, 별도 stylesheet/media query 파일 없음). 검증: pnpm lint(oxlint) 전체+Hero.tsx 단독 모두 통과(exit 0). pnpm test(vitest) 통과(테스트 파일 없음, --passWithNoTests, Hero.test.tsx는 TASK-36.2 별도 범위). pnpm build(tsc -b && vite build)는 vite.config.ts(17,3) TS2769('test' 속성이 UserConfigExport에 없음) 오류로 실패하나, git stash로 Hero.tsx 제외한 origin/main 커밋 21aa970d25411eab501647f2daf9ed68742a10f5 상태에서 동일 오류 재현 확인 — Hero.tsx와 무관한 기존 이슈(vite.config.ts는 이 leaf task 범위 밖의 별도 파일이라 직접 수정하지 않음). npx tsc -b --force 결과에도 Hero.tsx 관련 오류 0건. commit fbc79fe6ce4161746177eccf4d2d6ec023fd399a.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/src/sections/Hero.tsx 생성: CaseStudyHero 타입을 props로 받아 풀블리드 배경사진(heroImageUrl)+어두운 그라디언트 오버레이+headline/subheadline+summaryStats 배지+예약문의 CTA('예약 문의하기', onContactClick 있으면 button 아니면 #contact 앵커)를 렌더링. clamp()/vw/%/flex-wrap 기반 inline 스타일로 모바일 폭(~375px)까지 반응형. 검증: pnpm lint(oxlint, 전체+파일단독) exit 0, pnpm test(vitest) 통과, npx tsc -b --force 결과 Hero.tsx 관련 오류 0건 확인(단 vite.config.ts의 기존 TS2769 오류로 전체 pnpm build는 실패 — Hero.tsx 작업 전 origin/main 커밋 21aa970d25411eab501647f2daf9ed68742a10f5에서도 동일하게 재현되는 이 leaf 범위 밖의 기존 이슈, 별도 파일이라 수정하지 않음). commit fbc79fe6ce4161746177eccf4d2d6ec023fd399a. Tokens-Used(서브에이전트 근사): 57175. Tool-Calls(서브에이전트 근사): 10.
<!-- SECTION:FINAL_SUMMARY:END -->
