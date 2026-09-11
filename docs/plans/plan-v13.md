# plan-v13 — 모든 작업 전 반드시 git fetch + git pull (필수)

이전 버전: plan-v1~v12.md (모두 변경하지 않음)

## 문제

이번 세션에서 반복적으로 문제가 됐던 패턴: 로컬/서브에이전트 워크트리가 origin의 최신
상태를 반영하지 않은 채로 작업을 시작해서 벌어진 사고들 —
- PR #9가 이미 머지된 것을 모르고 그 브랜치에 추가 커밋을 쌓음(재작업 결과가 또 orphan될 뻔함)
- milestone 태그 수정이 이미 머지된 PR에 늦게 push되어 main에 반영 안 된 채 방치됨
- 여러 세션이 같은 로컬 디렉토리를 공유해서 브랜치가 예고 없이 바뀌는 문제

## 규칙(반드시 지켜야 함, 모든 세션·서브에이전트·클라우드 크론 공통)

**어떤 작업(task 착수, 커밋, PR 상태 확인, 리뷰/검증 등)을 시작하기 전에 반드시**:
1. `git fetch origin`
2. 작업 대상 브랜치가 `main`이면 `git pull origin main` (또는 최소 `git log HEAD..origin/main`으로
   뒤처짐 여부 확인), 기존 task 브랜치를 이어서 작업하는 경우 `git fetch origin && git log
   HEAD..origin/<브랜치>`로 원격이 앞서 있는지 확인
3. PR 상태를 참고할 때는 `gh pr view <N> --json state,headRefOid`로 **머지 여부부터 확인** —
   이미 머지된 PR 브랜치에는 절대 추가 커밋을 push하지 않는다(자동 반영 안 됨, plan-v12).

이 확인 없이 바로 구현/커밋으로 들어가지 않는다.

## 영향받는 범위
- reviewer, verify, logger 세션에 공지
- 클라우드 크론 프롬프트 맨 앞 단계로 추가
