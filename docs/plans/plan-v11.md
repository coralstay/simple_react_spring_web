# plan-v11 — backlog `--doc`은 append가 아니라 set이다 (필수 규칙)

이전 버전: plan-v1~v10.md (모두 변경하지 않음)

## 문제

`backlog task edit <ID> --doc <문서ID>`는 그 호출 시점에 해당 task의 `documentation`
필드 전체를 그 값(들)으로 **교체(set)**한다 — 이전에 걸려 있던 다른 문서 링크에 "추가(append)"
되는 것이 아니다. 같은 커맨드 한 번 안에서 `--doc`을 여러 번 쓰면(`--doc a --doc b`) 리스트로
합쳐지지만, 서로 다른 시점의 별도 호출은 이전 값을 덮어쓴다.

실제 사고: reviewer 세션이 TASK-1~4에 `--doc doc-2`를 걸어둔 뒤, verify 세션이 별도 호출로
`--doc doc-4`/`--doc doc-5`를 걸면서 doc-2 링크가 사라짐(발견 즉시 복원함).

## 규칙(반드시 지켜야 함, 모든 세션 공통 — orchestrator, reviewer, verify, 클라우드 크론)

어떤 task에 `--doc`으로 문서를 연결하기 전에:
1. 먼저 `backlog task view <ID>`로 기존 `documentation` 목록을 확인한다.
2. 기존 목록 전체 + 새로 추가할 문서 ID를 **한 번의 커맨드에 전부 나열**해서 호출한다.
   예: `backlog task edit TASK-1 --doc doc-2 --doc doc-5 --doc doc-6`
3. 기존 링크를 모르는 채로 `--doc` 하나만 단독 호출하지 않는다.

## 영향받는 범위
- reviewer, verify 세션에 이 규칙을 공지함(완료)
- 클라우드 크론 루틴 프롬프트에 이미 반영함(완료)
- 향후 이 프로젝트에서 backlog task를 다루는 모든 세션/에이전트에 적용
