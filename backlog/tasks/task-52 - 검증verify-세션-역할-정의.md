---
id: TASK-52
title: 검증(verify) 세션 역할 정의
status: Done
assignee: []
created_date: '2026-09-11 04:49'
updated_date: '2026-09-11 04:51'
labels: []
dependencies: []
documentation:
  - docs/plans/plan-v3.md
  - docs/plans/plan-v4.md
  - docs/plans/plan-v5.md
  - doc-2
  - doc-5
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
이 세션(simple-web-application-verify)의 역할을 backlog 공식 산출물로 문서화한다(사용자 지시,
2026-09-11 — 세션 역할/프로세스 정의는 개인 메모리로만 남기지 말고 backlog draft로 편입).

## 1. 역할
`simple-web-application-implementer`(구현)와 `simple-web-aplication-reviewer`(코드 품질/정합성
리뷰, 마일스톤 진행 중 구현 세션과 수시로 메시지를 주고받는 1차 루프)와는 별개로, 이 세션은
**다음 마일스톤 착수 전 최종 검수(final gate)**를 담당한다. reviewer 게이트와 verify 게이트는
서로 독립적이며 둘 다 통과해야 다음 마일스톤 진행 가능(근거: docs/plans/plan-v3.md, plan-v5.md).

## 2. 검증 방식
실제로 동작하는지 확인한다 — 여러 미머지 PR/브랜치를 격리된 워크트리(서브에이전트,
isolation: worktree)에서 실제로 병합·빌드·기동해보고, 코드/backlog 정합성을 확인한다. 이 세션
자신은 공유 작업 디렉토리에서 직접 checkout/build를 수행하지 않는다 — 다른 세션들이 같은 경로를
동시에 쓰고 있어 상태를 흐트러뜨릴 위험이 실제로 확인됨(구현 세션이 같은 디렉토리에서 uncommitted
변경을 갖고 있던 채로 브랜치를 옮겨둔 상태를 목격한 바 있음).

## 3. 기록 의무(무조건)
매 검증마다 `backlog doc create -p reviews -t specification` + `backlog doc update --content`로
결과를 기록하고, 관련 task에 `--doc`로 연결한다. 구조: 결론(PASS/FAIL) → 통과한 부분 → 블로킹
이슈(근거+요구 조치) → 비블로킹 참고 → 다음 단계. SendMessage로 구현/리뷰어 세션에 결과를
전달하는 것과는 별개로 반드시 이 기록을 남긴다(실제 사례: doc-2, doc-5).

주의(실전에서 발견한 함정): `backlog task edit --doc`은 여러 번의 호출에 걸쳐 누적(append)되는
게 아니라 마지막 호출 값으로 set된다. 기존 doc 링크를 유지하려면 한 호출에
`--doc <기존값> --doc <신규값>`처럼 전부 같이 넘겨야 한다(안 그러면 이전 링크가 사라짐 — 실제로
이 문제로 TASK-1/2/3/4에서 doc 링크가 유실되는 사고가 있었음).

## 4. 피드백 루프
FAIL이면 구현 세션(및 필요시 리뷰어 세션)에 SendMessage로 재작업을 요청하고, 재검증 요청이 오면
다시 확인한다. PASS면 다음 마일스톤 진행을 승인한다.
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
simple-web-application-verify 세션의 역할(구현/리뷰어와 별개의 최종 검수 게이트, 격리
워크트리 기반 실동작 검증, backlog doc 기록 무조건 의무, FAIL시 피드백 루프)을 backlog
draft(DRAFT-53) → task(TASK-52) 승격 절차로 공식 기록함. "구현할 작업"이 아니라 이미 실제로
수행 중인 역할/프로세스에 대한 기록이므로 즉시 Done 처리(사용자 확인, 2026-09-11). 근거:
docs/plans/plan-v3.md(reviewer 게이트), plan-v4.md(doc 기록 규칙), plan-v5.md(verify 게이트
추가), 실제 적용 사례 doc-2(M1 1차 검증)·doc-5(M1 2차 검증).
<!-- SECTION:FINAL_SUMMARY:END -->
