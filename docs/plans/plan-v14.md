# plan-v14 — updated_date 역행 사고 조사 결과 및 재발 방지

이전 버전: plan-v1~v13.md (모두 변경하지 않음)

## 조사 결과(TASK-53)

backlog 파일 전체의 git 히스토리를 훑어 `updated_date`가 역행한 지점을 찾았다 — 4건
발견(TASK-1.5, TASK-1.6, TASK-4.3, TASK-15.1). 전부 같은 커밋(`369c5f9e`, milestone 태그
113개 일괄 수정 커밋 — PR #13)에서 발생했다.

**현재 상태(main 기준, TASK-15.1은 PR #14 기준) 재확인 결과: 실제 데이터 손실은 없다.**
해당 4개 task 모두 status/AC/Final Summary가 온전하다 — 역행 지점 이후에 각 task의 실제
PR(#9/10/11)이 머지되면서 그 PR의 정확한 내용이 반영되어 자연적으로 복구됐다.

## 근본 원인

milestone 태그 일괄 수정(PR #13)을 준비하던 시점에 이 4개 task 파일의 **오래된(스텁)
스냅샷**을 기준으로 작업하고 있었는데, 그 사이 각 task의 실제 서브에이전트 작업(Done 처리,
Final Summary 작성)이 별도 브랜치에서 먼저 진행되고 있었다. rebase 충돌을 해결하는 과정에서
"어느 쪽이 더 완성된 내용인가"를 보지 않고 위치 기반(HEAD/theirs)으로만 판단해, 오래된
스냅샷의 내용이 일시적으로 main에 반영되는 커밋이 만들어졌다. 이번엔 각 task의 실제 PR이
나중에 머지되며 우연히 복구됐지만, 만약 그 PR이 더 늦게 머지됐거나 안 됐다면 데이터 손실이
그대로 남았을 것이다.

## 재발 방지 규칙(반드시 지켜야 함)

1. backlog task 파일에서 merge/rebase 충돌이 나면, 브랜치 위치(HEAD/theirs)로 기계적으로
   고르지 않는다 — **양쪽의 `status`/AC 체크 수/Final Summary 유무를 비교해서 더 완성된
   (진행 단계가 더 뒤인) 쪽을 남긴다.** 애매하면 양쪽 내용을 합쳐서 더 정보가 많은 버전으로
   만든다.
2. 여러 task의 metadata(milestone 태그 등)를 일괄 수정하는 작업은, **그 커밋을 실제로 push
   하기 직전에 최신 main을 다시 fetch/pull해서 각 task의 최신 상태 위에서 재적용**한다 —
   오래전에 준비해둔 브랜치를 그대로 rebase만 해서 밀어넣지 않는다(plan-v13의 fetch-first
   규칙과 결합).
3. backlog 관련 커밋 직후에는 방금 만든 커밋에서 status/AC/Final Summary가 의도치 않게
   후퇴하지 않았는지 `git show <해시>:<파일>`로 직접 눈으로 한 번 확인한다.

## 영향받는 범위
- reviewer, verify, logger 세션에 공지
- 클라우드 크론 프롬프트에도 반영(backlog 파일 충돌 해결 시 완성도 비교 규칙)
