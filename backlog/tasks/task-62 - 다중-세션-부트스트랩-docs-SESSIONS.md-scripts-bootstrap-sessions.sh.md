---
id: TASK-62
title: "다중 세션 부트스트랩: docs/SESSIONS.md + scripts/bootstrap-sessions.sh"
status: To Do
assignee: []
created_date: "2026-09-12 06:33"
updated_date: "2026-09-12 06:37"
labels:
  - governance
  - docs
  - scripts
dependencies: []
references:
  - TASK-55
  - TASK-61
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

# 다중 세션 부트스트랩: `docs/SESSIONS.md` + `scripts/bootstrap-sessions.sh`

## Context

이 프로젝트는 implementer/reviewer/verify(+logger) 4개의 Claude Code 세션이 각자 다른 git worktree에서 동시에 작업하는 구조로 설계돼 있다(`docs/plans/plan-v1.md`, plan-v3~v13). 문제는 이 구조가 지금까지 사람의 기억과 대화 맥락에만 존재했고, 컴퓨터를 껐다 켜거나 터미널을 전부 닫으면 "어떤 세션을 어디서 어떤 명령으로 다시 띄워야 하는지"를 매번 처음부터 복원해야 한다는 점이다. 사용자는 이걸 (1) 한 번 실행하면 4개 터미널이 각자 올바른 worktree로 들어가서 자동으로 작업을 재개하는 셸 스크립트, (2) 그 구조와 backlog/ 디렉토리 활용법을 설명하는 문서로 고정해두길 원한다.

조사 결과 확인된 사실:

- 실제 존재하는 worktree: implementer-workspace(branch worktree-implementer-workspace, 지금 이 세션), reviewer-workspace(worktree-reviewer-workspace), verify-workspace(worktree-verify-workspace) — 3개 모두 .claude/worktrees/ 아래 존재하고 locked 상태.
- logger 세션은 저장소 어디에도 공식 정의가 없다. plan-v12/plan-v13은 "reviewer, verify, logger 세션에 공지"라고만 언급하고, TASK-55(plan-v17 작성 — worktree 재확인 포함)와 TASK-61(recap doc-3를 역할별 4개 doc으로 분리, logger 몫 포함)가 아직 To Do로 남아있어 logger의 세션명/작업 디렉토리/트리거 방식/기록 위치는 전부 미확정이었다. 사용자가 이번에 직접 역할을 명확히 했다: logger는 implementer/reviewer/verify 세 세션이 문서/코드를 왜 그렇게 만들었는지 판단 근거와 대화 원문을 raw 그대로 수집/보관하는 장치다 — 요약도, 옳고 그름 평가도 하지 않는다. → 이 raw-보관 성격 때문에 logger의 출력물은 backlog doc이 아니라 일반 평문 로그 파일로 둔다 — 단, 사용자가 이번에 "로거도 함께 깃에 추적하자"고 확정했으므로 .gitignore에는 추가하지 않고 git으로 정상 커밋/추적한다(아래 "TASK-55/61과의 관계"에서 이 지점이 TASK-61 AC와 어긋난다는 점을 명시).
- claude <prompt>는 그 프롬프트를 첫 메시지로 넣은 대화형 세션을 바로 시작한다(-p와 달리 인터랙티브 유지) — 이걸로 /loop까지 자동 입력 가능.
- 터미널 자동화 도구로 iTerm2(설치 확인됨)를 osascript로 구동한다.
- 로컬 /loop는 터미널에 묶여 있어 컴퓨터를 끄면 함께 끊긴다(plan-v1) — 이 스크립트는 "재부팅 후 다시 켤 때 한 번에 복원"하는 것이지, 컴퓨터가 꺼진 동안에도 돌아가게 하는 게 아니다(그건 별개로 이미 계획된 클라우드 크론의 몫). 이 차이를 문서에 명시한다.
- TASK-42.1("README.md 작성")이 나중에 채용 담당자용 루트 README.md를 작성할 예정이므로, 이번에 만드는 "세션 운영 문서"를 루트 README.md에 쓰면 나중에 TASK-42.1이 덮어쓰며 충돌한다 → docs/SESSIONS.md로 분리해서 만든다.
- backlog/ 하위 구조(조사 결과): tasks/(176개, TASK-N/TASK-N.M 계층), milestones/(m-0~m-7, M9가 최상위 우선순위로 M2 재개를 막고 있음), drafts/(현재 draft-52 — AWS apply 등 수동승인 전용, 절대 자동 착수 금지), archive/drafts/(승격된 52개 원본 보관), docs/reviews/(doc-2,4,5,6,7,8 — 마일스톤별 리뷰/검증 결과), docs/logs/(doc-3 — 현재는 4개 역할이 공유하는 recap, TASK-61에서 역할별로 분리 예정), decisions/·completed/(미사용 — 의사결정은 대신 docs/plans/plan-vN.md에 기록), config.yml(프로젝트명/task_prefix만 커스텀, 나머지 기본값).

## 산출물

### 1. docs/SESSIONS.md (신규 문서)

구성:

1. 왜 4개 세션인가 — implementer/reviewer/verify/logger 역할 한 줄 요약 + 각 세션의 worktree 경로/브랜치(logger는 별도 worktree 없이 메인 저장소에서 동작, 이유 명시).
2. 세션별 반복 작업 내용 — 각 세션이 매 /loop 사이클마다 실제로 뭘 하는지 구체적 절차(plan-v3/v4/v5/v8/v10/v11/v12/v13 규칙 인용):
   - implementer: git fetch/pull 확인(plan-v13) → backlog board view로 다음 task 확인, 직전 마일스톤이 reviewer+verify 양쪽 PASS 기록 전이면 다음 마일스톤 진입 금지(plan-v10) → leaf task는 항상 서브에이전트 위임(불변식) 전에 부모+마일스톤 확인(plan-v8) → 함수 단위 커밋(git-format+Task-Id) → 마일스톤 Done 시 reviewer/verify에 SendMessage 요청 후 backlog doc 기록(plan-v3/v4/v5) → 상태 인용 시 전체 커밋 해시 기록(plan-v12) → 판단 근거를 logger 세션에 SendMessage로 원문 그대로 전달.
   - reviewer(simple-web-aplication-reviewer): 머지 여부 확인(plan-v13) → 미검토 마일스톤/PR 확인 → /code-review high 수행 → backlog doc create -p reviews 기록 + 기존 doc 링크 포함해서 task edit --doc 갱신(plan-v11) → implementer에 SendMessage 통보 → 리뷰 판단 근거를 logger 세션에 SendMessage로 원문 전달.
   - verify(simple-web-application-verify): 머지 여부 확인 → 실제 pull+빌드+scripts/test-all.sh 실행으로 AC/DoD 직접 확인(문서 주장만 믿지 않음) → PASS/FAIL을 backlog doc으로 기록 → implementer에 통보 → 판단 근거를 logger 세션에 SendMessage로 원문 전달.
   - logger: 별도 worktree 없이 메인 저장소에서 동작하는 순수 수집 장치 — 스스로 코드/backlog를 읽고 요약/판단하지 않는다. implementer/reviewer/verify가 SendMessage로 전달하는 "왜 이 문서/커밋/판정을 만들었는지"에 대한 원문 설명을 가공 없이 그대로 logs/raw-session-log.md(신규, git으로 정상 추적/커밋 — .gitignore 추가 안 함)에 타임스탬프+발신 세션명과 함께 append만 한다. 코드/backlog 수정 금지, 요약/평가/생략 금지.
3. 부트스트랩 스크립트 사용법 — scripts/bootstrap-sessions.sh 실행 방법, 무엇을 하는지, 인터벌(기본 60분, plan-v1 근거) 바꾸는 법, "실제로 자율 작업이 시작되니 프롬프트 내용을 먼저 확인하라"는 경고.
4. backlog/ 디렉토리 구조 및 실제 활용법 (사용자가 명시적으로 요청) — 조사에서 나온 표를 옮겨서 각 디렉토리 역할 + 이 프로젝트에서 실제로 쓰인/안 쓰인 방식(decisions/·completed/ 미사용 등)을 설명.
5. TASK-55/TASK-61과의 관계 — 이 문서가 만드는 worktree 재확인은 TASK-55(plan-v17) 스코프와 겹친다는 점을 명시. 특히 TASK-61의 현재 AC("backlog doc 4개: 진행 로그 implementer/reviewer/verify/logger 신규 생성")는 logger도 나머지 3개처럼 backlog doc을 갖는 것을 전제하는데, 사용자가 이번에 확정한 logger 역할(raw 대화/판단근거를 가공 없이 보관하는 장치)은 backlog doc이 아니라 git으로 추적되는 평문 로그(logs/raw-session-log.md)가 맞다는 점에서 TASK-61의 AC #1은 실행 시점에 수정이 필요하다고 이 문서에 명시적으로 남긴다(승격/실행 전에 TASK-61 자체도 이 논의를 반영해 갱신하는 걸 권장).

### 2. scripts/session-prompts/{implementer,reviewer,verify,logger}.md (신규, 4개 파일)

각 세션에 claude로 전달할 실제 프롬프트 원문(위 "세션별 반복 작업 내용"을 명령형으로 정리 + 맨 앞에 /loop 60m 접두). 셸 스크립트와 분리해두면 나중에 프로세스 규칙(plan-v14+)이 바뀔 때 셸 코드를 안 건드리고 이 문서만 고치면 됨.

### 3. scripts/bootstrap-sessions.sh (신규)

- 리포 루트 경로를 고정 변수로 두고, 3개 named worktree(implementer/reviewer/verify)가 없으면 git worktree add로 먼저 만든다(멱등성 — 새로 클론한 환경에서도 동작).
- iTerm2 창 하나에 탭 4개를 osascript로 생성, 각 탭에서 cd "<worktree 경로>" && claude "$(cat scripts/session-prompts/<role>.md)" 실행.
- 상단에 인터벌(LOOP_INTERVAL=60m) 변수를 둬서 쉽게 조정 가능하게 한다.
- 스크립트 맨 위 주석으로 "이 스크립트를 실행하면 4개 세션이 실제로 커밋/PR 등 자율 작업을 시작한다"는 경고를 남긴다.

## 다음 단계

backlog draft promote로 task 승격 → 승격 직후 TASK-55/TASK-61을 --add-ref/--doc으로 연결 → 실행 시점에 "leaf task = 파일 1개" 불변식에 따라 docs/SESSIONS.md, scripts/bootstrap-sessions.sh, 프롬프트 파일 4개를 각각 별도 leaf task로 쪼개고 각각 서브에이전트에 위임해서 구현 → 작은 단위 커밋.

## 검증 방법

- docs/SESSIONS.md: 저장소 실제 worktree 목록(git worktree list)/backlog 디렉토리 실제 내용과 문서 설명이 일치하는지 대조.
- scripts/bootstrap-sessions.sh: 실제로 실행하기 전에 먼저 bash -n scripts/bootstrap-sessions.sh로 문법 검사, 이후 로컬에서 1회 실행해 iTerm2에 탭 4개가 올바른 디렉토리로 열리는지 확인. 단, 각 탭에서 claude "..." 프롬프트가 실제로 전송되어 자율 루프가 시작되는 순간부터는 실제 커밋/PR이 발생할 수 있으므로, 최초 실행 후에는 각 탭이 올바른 역할 프롬프트로 시작하는지 눈으로 확인한 뒤 필요하면 즉시 중단(Ctrl+C)하고, 실제로 몇 시간 동안 자율로 돌릴지는 사용자가 별도로 결정한다.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 docs/SESSIONS.md 문서가 저장소 루트에 존재하고 4개 세션 역할/worktree 경로/backlog 디렉토리 표/TASK-55·61과의 관계를 모두 포함한다
- [ ] #2 scripts/session-prompts/ 아래 4개(implementer,reviewer,verify,logger) 역할별 프롬프트 파일이 존재한다
- [ ] #3 scripts/bootstrap-sessions.sh가 존재하고 bash -n으로 문법 검사를 통과한다

<!-- AC:END -->
