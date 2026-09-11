---
id: doc-5
title: M1 재검증(verify) 결과 — 2차
type: specification
created_date: '2026-09-11 04:39'
updated_date: '2026-09-11 04:40'
---
# M1 재검증(verify) 결과 — 2차 (PR #6 task/TASK-1.5 + PR #7 docs/plan-v9-TASK-9)

검증자: simple-web-application-verify 세션
검증 방법: 격리 워크트리에서 origin/main + origin/task/TASK-1.5 + origin/docs/plan-v9-TASK-9를
merge-tree로 합쳐 실제 재현.

## 결론: 아직 FAIL — PR #7의 backlog 회귀 1건 수정 후 재확인 필요

doc-2의 블로킹 이슈 2건(test-all.sh exit 1, TASK-4.1/4.2 AC 미체크)은 **기능적으로는 확실히
고쳐졌음**을 확인. 다만 그 수정을 담은 PR #7이 backlog 메타데이터를 되돌리는 새로운 회귀를
포함하고 있어, 이 상태로 머지하면 원래 문제가 코드상으로는 고쳐졌는데 backlog 기록만 다시
깨지는 결과가 됨.

## 확인된 것 (통과)
- `frontend/package.json` test 스크립트가 `vitest run --passWithNoTests`로 변경됨. 테스트
  0개 상태에서 exit 0, 일부러 실패하는 테스트를 넣었을 땐 exit 1로 정상 동작(재현 완료) —
  "테스트 없음"과 "테스트 실패"가 실제로 구분됨.
- `bash scripts/test-all.sh`를 frontend+backend 실공존 상태에서 재실행 → **exit 0** (이전엔
  exit 1이었음, 이번 회차의 핵심 게이트 통과).
- 백엔드 `./gradlew build` 정상(이번 회차엔 백엔드 코드 변경 없어 회귀 없음만 확인).
- TASK-4.1/TASK-4.2: AC 체크(`[x]`) + Implementation Notes로 실제 원인(frontend/package.json)
  명시. 정상.
- TASK-4(부모): Final Summary가 "원인은 TASK-4 자신이 아니라 TASK-1의 frontend/package.json"
  으로 정정됨. 다만 "TASK-1.5로 수정 중"이라는 표현이 남아있어(수정 완료인데 진행중처럼 읽힘)
  사소한 문구 정정 필요.
- TASK-1.6(jsdom 설정), TASK-4.3(git-format taskPrefix 스크립트): 아직 미구현 상태(To Do,
  AC 미체크, Final Summary 없음)이고 실제로도 미구현(vite.config.ts에 jsdom 설정 없음,
  scripts/setup-dev-env.sh 파일 자체가 없음) — Done이 아닌데 Done처럼 보이는 문제는 없음.
  단, reviewer doc-4는 이 둘을 "M2 착수 전 필수"로 분류했으니 M2 시작 전 실제 구현이 필요함
  (이건 reviewer 게이트 소관으로 남겨둠).
- TASK-6/TASK-13 → TASK-15.1 의존성 엣지: 양쪽 다 Dependency Graph에 정상 반영됨.

## 블로킹 이슈 (신규 발견 — PR #7 커밋 ce86b7d)

### TASK-1.5의 Done 상태/AC/Final Summary가 PR #7에서 통째로 되돌려짐
`origin/task/TASK-1.5` 브랜치 자체에는 TASK-1.5가 정상적으로 Done, AC `[x]`, Final Summary
포함 상태로 커밋돼 있음. 그런데 `docs/plan-v9-TASK-9`(PR #7, TASK-1.5 커밋들 위에 얹힌 브랜치)의
커밋 `ce86b7d`가 같은 파일(`backlog/tasks/task-1.5 - ...md`)을 **status: Done→To Do, AC
[x]→[ ], Final Summary 섹션 전체 삭제**로 덮어쓰고 `documentation: doc-4` 링크만 추가함.
`origin/main`+`origin/task/TASK-1.5`+`origin/docs/plan-v9-TASK-9`를 다 합친 실제 머지 결과
기준으로 `backlog task view TASK-1.5`를 확인하면 To Do, AC 미체크, Final Summary 없음으로
나옴 — **코드 수정(기능)은 진짜로 됐는데, backlog 기록만 다시 미완료로 회귀**하는 상태.

**요구 조치**: PR #7에서 TASK-1.5 파일 수정분을 제거하거나, `documentation: doc-4`만 추가하고
기존 status/AC/Final Summary는 그대로 보존하도록 다시 커밋해주세요. (아마 PR #7을 만들 때
TASK-1.5의 Done 처리 이전 스냅샷 위에서 작업해 실수로 되돌린 것으로 보입니다.)

## 비블로킹 참고사항
- 같은 커밋(`ce86b7d`)이 TASK-1/TASK-2/TASK-3/TASK-4의 `documentation:` 필드도
  `doc-2`→`doc-4`로 **교체**(추가 아님)해서, 이 네 task에서 `doc-2`(이번 verify 세션의 최초
  검증 기록) 링크가 빠짐. `task view`만으로 전체 맥락이 로딩되게 하자는 워크플로 취지에 어긋나니,
  TASK-1.5를 고칠 때 이 네 task들도 `--doc doc-2`로 다시 링크해주시면 좋겠습니다(doc-4는 유지).
- 백엔드 테스트 소스가 아직 하나도 없어(`:test` NO-SOURCE) test-all.sh/gradlew test가 백엔드
  회귀는 아직 못 잡음 — 이번 회차 스코프 밖이지만, 프런트에서 방금 고친 것과 같은 종류의 공백.

## 다음 단계
1. 구현 세션이 TASK-1.5 회귀 + doc-2 링크 누락을 수정.
2. 재확인 요청 오면 이번엔 backlog 상태만 빠르게 재확인(기능 쪽은 이미 검증 완료라 재빌드까지는
   불필요할 가능성 높음).
3. reviewer 게이트(doc-4의 "M2 착수 전 필수" 3건, 특히 TASK-1.6/TASK-4.3/TASK-15.1 실제 구현
   여부)는 별도로 확인 필요 — verify 통과와 무관하게 독립적인 게이트(plan-v5).
