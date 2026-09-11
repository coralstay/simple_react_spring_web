---
id: TASK-1.6
title: Vitest jsdom 환경+setupFiles 설정
status: Done
assignee: []
created_date: '2026-09-11 04:27'
updated_date: '2026-09-11 09:45'
labels: []
milestone: m-0
dependencies: []
modified_files:
  - frontend/vite.config.ts
parent_task_id: TASK-1
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 컴포넌트 테스트에서 document/RTL/jest-dom 사용 가능(jsdom is not defined류 에러 없음)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. frontend/vite.config.ts에 test.environment='jsdom', test.setupFiles=['@testing-library/jest-dom/vitest'] 추가(설치된 패키지의 vitest 전용 export를 setupFiles에서 직접 참조 — 새 로컬 setup 파일을 만들지 않고 파일 1개 범위 유지)
2. 임시 컴포넌트 테스트 파일로 document/RTL render/jest-dom matcher(toBeInTheDocument)가 에러 없이 동작하는지 확인 후 커밋 전 삭제
3. pnpm test 및 scripts/test-all.sh 통과 확인
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
frontend/vite.config.ts의 test 설정에 environment: 'jsdom'과 setupFiles: ['@testing-library/jest-dom/vitest']를 추가(새 로컬 setup 파일 없이 패키지가 제공하는 vitest 전용 export를 직접 참조해 leaf=파일1개 유지). 검증: 임시 테스트 파일(App.tmp.test.tsx)에서 document 접근, @testing-library/react render/screen 사용, jest-dom의 toBeInTheDocument matcher가 모두 에러 없이 통과함을 pnpm test로 확인 후 커밋 전 삭제. scripts/test-all.sh: frontend는 실제 테스트 없이 exit 0(passWithNoTests) 통과. backend는 이 샌드박스에 JDK 25가 없어(Java 21만 존재) 여전히 실패하나, main 브랜치에서도 동일하게 실패하는 기존 환경 제약(이 변경과 무관, TASK-4.3에서도 동일 확인).
<!-- SECTION:FINAL_SUMMARY:END -->
