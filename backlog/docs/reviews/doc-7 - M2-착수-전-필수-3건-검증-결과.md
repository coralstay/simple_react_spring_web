---
id: doc-7
title: M2 착수 전 필수 3건 검증 결과
type: specification
created_date: '2026-09-11 12:00'
updated_date: '2026-09-11 12:00'
---
# M2 착수 전 필수 3건(reviewer doc-4) 검증 결과

검증자: simple-web-application-verify 세션
대상: PR #9(task/TASK-15.1, head 5fbec534fd76b19f728f568df365331bd277f98f),
PR #10(task/TASK-4.3, head b72a283b58d7636b6574f9c81281cabf567fb876),
PR #11(task/TASK-1.6, head 9e348c3094912510e2c842c3b94a08ee0a11771f) —
기준 main head f3d7e04ad79070063f69c9de1007f89cae0e3623
방법: 격리 워크트리에서 세 브랜치를 순서대로 merge-tree 시뮬레이션으로 합쳐 실제 빌드/기동/테스트.

## 결론: TASK-4.3·TASK-1.6은 PASS, TASK-15.1은 재작업 필요

## 통과 — TASK-4.3 (git-format 셋업 스크립트)
`scripts/setup-dev-env.sh`가 실제로 `git config gitformat.taskPrefix TASK`를 세팅함을
재현 확인(끄고 다시 스크립트 실행 → 정상 세팅). Final Summary 정확.

## 통과 — TASK-1.6 (vitest jsdom)
`frontend/vite.config.ts`에 `test.environment: "jsdom"` + setupFiles 정상 반영.
document/RTL 사용하는 실제 컴포넌트 테스트를 임시로 작성해 통과 확인(재현 완료). Final
Summary 정확.

## 재작업 필요 — TASK-15.1 (SecurityConfig)
기능적으로는 M2를 막던 401-everywhere 문제를 실제로 해소함(curl로 재현 확인 — 404, WWW-Authenticate
헤더 없음). 하지만 세 가지 문제가 있음:

1. **스코프가 요구보다 훨씬 넓음**: 코드가 `.authorizeHttpRequests(authorize ->
   authorize.anyRequest().permitAll())`로 **모든 경로**를 열어버림. reviewer doc-4의 요구는
   "공개 경로(GET /api/case-study, POST /api/inquiries)는 permitAll, 나머지는 나중에 TASK-15가
   마저 구성"이었는데, 지금 상태는 향후 어떤 엔드포인트를 추가해도 누군가 의도적으로 좁히기
   전까지는 전부 무방비로 열려 있음. 클래스 자체 Javadoc에 "임시, 나중에 /dashboard/**로
   좁혀야 함"이라고 적혀 있어 의도는 알겠으나, 이를 강제/추적하는 장치가 없음.
2. **AC 문구가 실제 구현과 안 맞음**: AC #1이 "JWT 필터체인"인데 실제로는 JWT 없이 permitAll만
   있는 임시 스텁. M2 unblock이라는 실질 목적은 달성했지만, 체크된 AC 문구 자체는 배포된 코드를
   정확히 설명하지 않음(TASK-15.1의 원래 AC가 이후 TASK-15의 JWT 작업에서 물려받은 문구를
   그대로 쓴 것으로 보임 — task 재정의 시 AC도 같이 갱신됐어야 함).
3. **Final Summary의 검증 근거가 성립하지 않음**: "로컬에 Postgres가 없어 bootRun이 기동 전에
   실패했고, 그 실패 로그에서 'Using generated|SecurityFilterChain'을 grep했더니 0건이라
   SecurityConfig가 정상 적용된 것"이라고 결론지었는데, 실제로 Postgres를 띄우고 앱을 끝까지
   기동시켜보면 `Using generated security password: ...` 로그가 **나타남**(이건 무관한
   UserDetailsServiceAutoConfiguration 관련 정상 로그라 실제 SecurityFilterChain 동작과는
   무관하지만, 애초에 "로그에 안 나타나서 확인됐다"는 근거 자체가 틀림 — 앱이 기동조차 안 된
   상태에서 낸 결론이었음). 이번 verify가 curl로 직접 재현해서 기능은 확인했지만, 그건 이
   Final Summary가 주장한 방법과는 무관한 별도 검증임.

**요구 조치**:
- `anyRequest().permitAll()`을 `GET /api/case-study`, `POST /api/inquiries` 등 실제 공개
  경로로 좁히고, 나머지는 기본(인증 필요) 상태로 유지.
- AC 문구를 실제 구현(임시 permitAll 스텁, JWT 아님)에 맞게 정정하거나, JWT가 정말 필요하면
  범위를 다시 잡을 것.
- Final Summary를 실제로 재현 가능한 근거(예: 이번 verify처럼 curl 응답 코드/헤더 직접 확인)로
  교체.

## 부수 발견 (머지 시 주의)
PR #9(task/TASK-15.1) 브랜치의 자기 task 파일에 `milestone: m-2` 필드가 빠져 있음(브랜치가
milestone 태그 백필 커밋보다 먼저 분기됨). merge 시 `--doc`/필드 유실 문제와 같은 종류라, PR
머지 담당자가 수동으로 milestone 필드 복원 필요.

## 참고
`bash scripts/test-all.sh`는 세 PR을 합친 상태에서도 exit 0 유지(회귀 없음).

## 다음 단계
TASK-4.3·TASK-1.6은 이대로 머지 가능. TASK-15.1은 위 재작업 후 재검증 요청 바람. reviewer
doc-4의 "M2 착수 전 필수 3건" 게이트는 TASK-15.1이 재작업되기 전까지는 닫힌 것으로 보지 않음.
