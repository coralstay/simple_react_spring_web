# 세션 운영 가이드 (implementer / reviewer / verify / logger)

이 문서는 이 프로젝트를 돌리는 4개 Claude Code 세션의 구조와, `backlog/` 하위 디렉토리가
실제로 어떻게 쓰이는지를 설명한다.

> 이 문서는 저장소 루트 `README.md`가 아니다. 루트 `README.md`는 아직 To Do 상태인
> TASK-42.1이 프로젝트 소개/기술 문서로 별도 작성할 예정이라, 이번 세션 운영
> 내용을 루트에 써 두면 나중에 TASK-42.1이 그 내용을 덮어써 버린다. 그래서 세션 운영
> 문서는 `docs/SESSIONS.md`로 분리한다.

## 1. 왜 4개 세션인가

이 프로젝트는 하나의 세션이 구현→리뷰→검증→기록을 전부 떠맡지 않고, 서로 다른 4개의
Claude Code 세션이 각자의 역할만 맡도록 분리되어 있다. 같은 세션이 자기 코드를 스스로
리뷰/검증하면 맹점을 놓치기 쉽다는 것이 분리의 핵심 이유다(`docs/plans/plan-v1.md`,
plan-v3~v13).

| 역할        | 세션명                                                                     | worktree 경로                                                                                     | 브랜치                                 |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------- |
| implementer | (오케스트레이터, 별도 고정 세션명 없음 — 이 워크트리에서 도는 대화형 세션) | `.claude/worktrees/implementer-workspace`                                                         | `worktree-implementer-workspace`       |
| reviewer    | `simple-web-aplication-reviewer`*                                          | `.claude/worktrees/reviewer-workspace`                                                            | `worktree-reviewer-workspace`          |
| verify      | `simple-web-application-verify`                                            | `.claude/worktrees/verify-workspace`                                                              | `worktree-verify-workspace`            |
| logger      | `claude-web-application-logger`                                            | **없음** — 메인 저장소 체크아웃 경로(`/Users/flynn_macpro/simple_react_spring_web`)에서 직접 동작 | (메인 체크아웃이 그때그때 있는 브랜치) |

\* `simple-web-aplication-reviewer`는 오타(application → aplication)이지만, plan 문서와
실제 세션명 양쪽에서 이미 이 철자로 굳어져 있으므로 그대로 유지한다. 새로 세션을 다시
만들 때 `simple-web-application-reviewer`로 정정하지 말 것 — 살아있는 세션명과 어긋나게
된다.

3개 worktree(implementer/reviewer/verify)는 실제로 `.claude/worktrees/` 아래 존재하며
`git worktree list` 기준으로 모두 `locked` 상태다. logger만 별도 worktree가 없는 이유는
역할 자체가 다르기 때문이다 — logger는 코드나 backlog를 읽거나 수정하지 않는 순수 관찰자라
격리된 작업 공간이 애초에 필요 없다(아래 4번 참고).

## 2. 세션별 `/loop` 사이클 절차

아래 절차는 이 저장소의 `docs/plans/plan-v3.md`, `plan-v4.md`, `plan-v5.md`, `plan-v8.md`,
`plan-v10.md`, `plan-v11.md`, `plan-v12.md`, `plan-v13.md`에서 그대로 가져온 규칙이다.
실제 문구는 해당 plan 파일에 있으니 세부 근거가 필요하면 원문을 참고한다.

### implementer

매 `/loop` 사이클마다:

1. **git fetch/pull 확인** (plan-v13) — 작업을 시작하기 전에 반드시 `git fetch origin`부터
   실행하고, main 기준이면 `git pull origin main`(또는 최소 `git log HEAD..origin/main`으로
   뒤처짐 확인), 기존 task 브랜치를 이어가는 경우
   `git fetch origin && git log HEAD..origin/<브랜치>`로 원격이 앞서 있는지 확인한다. PR 상태를 참고할 땐
   `gh pr view <N> --json state,headRefOid`로 머지 여부부터 확인하고, 이미 머지된 PR
   브랜치에는 추가 커밋을 push하지 않는다.
2. **다음 task 선정 + 마일스톤 게이트** (plan-v10) — `backlog board view`로 다음 task를
   고른다. 단, 직전 마일스톤이 reviewer+verify 양쪽 모두 "PASS"로 기록된 상태가 아니면
   (진행 중이거나 FAIL/보류 상태라면) 다음 마일스톤으로 넘어가지 않고 현재 마일스톤 안의
   남은 task만 처리한다. 판단 근거는 해당 마일스톤 task에 연결된 backlog doc의 최종
   결론이며, 애매하면 진행하지 않는 쪽(보수적 판단)을 택한다.
3. **leaf task 위임 전 상위 2뎁스 확인** (plan-v8) — leaf task를 서브에이전트에 위임하기
   전에, implementer 자신이 먼저 그 leaf의 **부모 task**(`backlog task view <parent>`)와
   **소속 마일스톤**(`backlog milestone list`)을 확인하고 그 맥락을 서브에이전트 프롬프트에
   포함시킨다. leaf 하나만 보고 좁게 판단해 상위 AC/의도와 어긋나는 구현을 하는 사고를
   예방하기 위함이다.
4. **함수 단위 커밋** — AC 하나가 여러 함수/메서드로 이뤄져 있어도 AC 완료까지 기다리지
   않고 함수(메서드) 하나를 구현할 때마다 커밋한다(plan-v1의 "커밋 단위 = 함수 단위"
   불변식). 각 커밋은 git-format 컨벤션(`[type][subsystem] <description>`, 본문에
   무엇을/왜, footer에 `Task-Id: <ID>` 트레일러)을 따른다.
5. **마일스톤 완료 시 리뷰/검증 요청** (plan-v3/v4/v5) — 마일스톤의 모든 task가 Done이 되면
   곧바로 다음 마일스톤으로 넘어가지 않고, `simple-web-aplication-reviewer`와
   `simple-web-application-verify` 양쪽에 SendMessage로 리뷰/검증을 요청한다. 돌아온
   피드백을 반영한 뒤, 그 리뷰/검증 내용 자체를 `backlog doc create -p reviews`로 파일에
   남기고 관련 task에 `backlog task edit --doc <docId>`로 연결한다.
6. **상태 인용은 전체 커밋 해시로** (plan-v12) — 리뷰 결과/검증 결과/진행 상태를 backlog
   doc이나 task에 기록할 때 브랜치명만 쓰지 않고 그 시점의 전체 40자 커밋 해시
   (`git log -1 --format=%H`)를 함께 남긴다. 이미 머지된 PR 브랜치에 나중에 커밋을 추가로
   push해도 main에 자동 반영되지 않으므로, 그런 경우 반드시 새 PR을 연다.
7. **logger에게 판단 근거 전달** — 왜 이 문서/커밋을 이렇게 만들었는지에 대한 원문 설명을
   SendMessage로 `claude-web-application-logger`에 그대로 전달한다(요약하지 않는다).

### reviewer (`simple-web-aplication-reviewer`)

1. **머지 여부 확인** (plan-v13) — 리뷰 대상 PR이 이미 머지됐는지 `gh pr view` 등으로 먼저
   확인한다.
2. 미검토 상태인 완료된 마일스톤/PR을 찾는다.
3. `/code-review high`를 수행한다.
4. 리뷰 결과를 `backlog doc create -p reviews`로 기록하고, 관련 task들에
   `backlog task edit --doc`로 연결한다. 이때 **기존에 이미 연결돼 있던 doc 링크를 먼저
   확인해서 전부 함께 나열**해야 한다 — `--doc`은 append가 아니라 그 시점의
   `documentation` 필드 전체를 교체(set)하는 동작이라, 기존 목록을 모르는 채로 단독 호출하면
   이전 리뷰/검증 문서 링크가 사라진다(plan-v11 — 실제로 TASK-1~4에서 doc-2 링크가
   verify의 후속 `--doc` 호출로 사라졌던 사고가 있었다).
5. implementer에게 SendMessage로 결과를 통보한다.
6. 리뷰 판단 근거 원문을 `claude-web-application-logger`에 SendMessage로 그대로 전달한다.

### verify (`simple-web-application-verify`)

1. 머지 여부를 먼저 확인한다(plan-v13과 동일한 원칙).
2. **실제로 pull하고 빌드하고 `scripts/test-all.sh`를 실행**해서 AC/DoD를 직접 확인한다 —
   문서에 "테스트 통과했다"고 적혀 있어도 그 주장만 믿지 않고 스스로 재현해서 확인한다.
3. PASS/FAIL 판정을 `backlog doc`으로 기록한다(reviewer와 마찬가지로 기존 `--doc` 링크를
   먼저 확인하고 전부 함께 나열, plan-v11).
4. implementer에게 SendMessage로 통보한다.
5. 판단 근거 원문을 `claude-web-application-logger`에 SendMessage로 그대로 전달한다.

### logger (`claude-web-application-logger`)

logger는 별도 worktree 없이 메인 저장소 체크아웃 경로에서 동작하는 **순수 raw-데이터 수집
장치**다. 다른 세 세션과 결정적으로 다른 점: **logger는 스스로 코드나 backlog를 읽고
요약하거나 판단하지 않는다.** 오직 implementer/reviewer/verify가 SendMessage로 보내오는
"왜 이 문서/커밋/판정을 이렇게 만들었는지"에 대한 원문 설명을 가공(요약/평가/생략) 없이
그대로, 타임스탬프와 발신 세션명을 붙여서 `logs/raw-session-log.md`에 append만 한다.

- `logs/raw-session-log.md`는 **git으로 정상 추적/커밋되는 일반 평문 파일**이다(`.gitignore`에
  추가하지 않는다) — backlog doc이 아니다. 이 구분이 왜 중요한지는 5번 섹션 참고.
- 코드/backlog 수정 금지, append 외의 어떤 편집도 하지 않는다.

## 3. `scripts/bootstrap-sessions.sh` 사용법

> 이 스크립트는 이 태스크(TASK-62.1)의 형제 태스크인 TASK-62.6에서 별도로 작성된다.
> 이 글을 쓰는 시점에는 아직 존재하지 않을 수도 있으므로, 아래 설명은 TASK-62 상위 태스크의
> 산출물 정의를 근거로 한 **예정된 동작**을 설명한 것이다 — 실제 파일 내용과 다를 경우
> 실제 스크립트 쪽이 최신 기준이다.

`scripts/bootstrap-sessions.sh`는 컴퓨터를 껐다 켜거나 터미널을 전부 닫은 뒤, 4개 세션을
한 번에 복원하기 위한 스크립트다.

- **worktree 생성(멱등)**: implementer/reviewer/verify 3개 named worktree가 아직 없으면
  `git worktree add`로 먼저 생성한다. 이미 존재하면 다시 만들지 않는다 — 새로 클론한
  환경에서도, 이미 세팅된 환경에서도 안전하게 반복 실행 가능해야 한다. logger는 worktree가
  없으므로 이 단계에서 생성 대상이 아니다.
- **iTerm2 탭 4개 기동**: iTerm2 창 하나에 탭 4개를 `osascript`로 열고, 각 탭에서
  `cd "<worktree 경로>" && claude "$(cat scripts/session-prompts/<role>.md)"`를 실행한다.
  `claude "<prompt>"` 형태는 그 프롬프트를 첫 메시지로 넣은 **대화형** 세션을 시작한다
  (`-p`처럼 결과만 내고 끝나는 게 아니라 세션이 유지된다). 각 프롬프트 파일은 `/loop 60m`으로
  시작하므로, 탭이 열리는 즉시 그 세션은 60분 간격의 자율 루프를 실제로 시작한다.
- **인터벌 조정**: 스크립트 상단의 `LOOP_INTERVAL` 변수(기본값 60분)로 간격을 조정할 수
  있다. 기본값 60분의 근거는 `docs/plans/plan-v1.md`의 "체크인 간격" 절 — 사용자가 Pro
  플랜을 쓰고 있어 한도가 상대적으로 좁으므로, 너무 짧은 간격은 한도를 순식간에 소모해
  오히려 자주 멈추는 역효과를 낸다는 판단에 따른 것이다.
- **경고**: 이 스크립트를 실행하면 4개 세션이 **즉시 자율 작업(커밋/PR 등)을 시작**한다.
  실행 전에 반드시 `scripts/session-prompts/{implementer,reviewer,verify,logger}.md`의
  실제 내용을 먼저 읽고 지금 원하는 지시가 맞는지 확인한 뒤 실행할 것.
- **로컬 `/loop`의 한계**: 이 스크립트로 띄운 `/loop`는 터미널/세션에 묶여 있어서, 컴퓨터를
  끄면 함께 끊긴다(plan-v1). 즉 이 스크립트는 "컴퓨터를 다시 켰을 때 한 번에 복원"하는
  용도이지, 컴퓨터가 꺼져 있는 동안에도 계속 돌아가게 만드는 것이 아니다 — 꺼진 동안에도
  도는 실행 주체는 별도로 계획된 클라우드 크론(`schedule` 스킬)의 몫이다.

## 4. `backlog/` 하위 디렉토리 구조와 실제 활용법

아래는 이 문서를 쓰는 시점에 저장소를 직접 조사해 확인한 실제 상태다(수치는 시간이 지나면
바뀔 수 있으니, 정확한 최신 값은 각 디렉토리를 직접 `ls`/`find`로 확인할 것).

| 디렉토리                  | 역할                                                      | 이 프로젝트에서 실제 활용                                                                                                                                                                                                                                                                                    |
| ------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `backlog/tasks/`          | 개별 작업 단위. `TASK-N`(상위)/`TASK-N.M`(leaf) 계층 구조 | 실제로 활발히 사용 중 — 확인 시점 기준 180개 안팎의 task 파일(TASK-62 계열 등 진행 중인 것 포함, 수시로 늘어남)                                                                                                                                                                                              |
| `backlog/milestones/`     | 여러 task를 묶는 상위 단계                                | `m-0` ~ `m-7` 존재. `m-0` ~ `m-6`은 M1~M7(초기 설정 → 인프라/배포)까지의 원래 로드맵, `m-7`은 새로 추가된 **M9 워크플로 거버넌스 및 토큰 측정** — M2 재개보다 우선순위가 높게 잡혀 있어 M2(m-1) 작업 재개를 현재 막고 있다                                                                                   |
| `backlog/drafts/`         | plan mode 승인 직후, 아직 실제 task로 승격되지 않은 초안  | 확인 시점 기준 `draft-52` 1건 존재 — AWS 인증 연결/`terraform apply`/최초 배포처럼 실제 비용·자원이 발생하는 수동 승인 전용 작업. **자동으로 착수해서는 안 되는 항목**임을 draft 상태 자체가 표시한다                                                                                                        |
| `backlog/archive/drafts/` | 승격이 끝난 draft의 원본 보관                             | 확인 시점 기준 52개 파일 — draft가 promote될 때마다 원본이 여기로 옮겨져 쌓인 것으로, draft 1~52까지의 이력이 그대로 남아 있다                                                                                                                                                                               |
| `backlog/docs/reviews/`   | 마일스톤/PR 단위의 리뷰(reviewer)·검증(verify) 결과 기록  | 실제로 쓰이고 있음 — 확인 시점 기준 `doc-2`(M1 verify 결과), `doc-4`(M1 리뷰 결과), `doc-5`(M1 재검증 2차), `doc-6`(M1 최종 PASS), `doc-7`(M2 착수 전 필수 3건 검증), `doc-8`(PR #14 SecurityConfig 재작업 검증), `doc-9`(M2 착수 전 필수 3건 — reviewer 최종 확인) 등 마일스톤 진행에 맞춰 계속 늘어나는 중 |
| `backlog/docs/logs/`      | 진행 로그(recap)                                          | 현재는 `doc-3`(진행 로그 — recap 기록) 하나뿐이며, implementer/reviewer/verify/logger 네 역할이 전부 이 한 파일에 공통으로 append하는 구조라 서로 다른 브랜치가 파일 끝부분을 동시에 수정해 머지 충돌이 난다. TASK-61이 이 문제를 역할별 recap doc 4개로 분리하는 작업을 계획 중이다(아래 5번 참고)          |
| `backlog/decisions/`      | backlog.md 표준 기능상 의사결정 기록용 디렉토리           | **이 저장소에는 존재하지 않는다** — 한 번도 생성/사용된 적이 없다. 이 프로젝트의 의사결정은 대신 `docs/plans/plan-vN.md` 파일 시리즈에 순차적으로 기록하는 방식을 쓴다                                                                                                                                       |
| `backlog/completed/`      | backlog.md 표준 기능상 완료 task 아카이브용 디렉토리      | **이 저장소에는 존재하지 않는다** — 한 번도 생성/사용된 적이 없다. Done 처리된 task도 `backlog/tasks/`에 그대로 남아 상태 필드(`status: Done`)로만 구분한다                                                                                                                                                  |
| `backlog/config.yml`      | 프로젝트 backlog 설정                                     | `project_name`("simple-react-spring-web")과 `task_prefix`("task")만 이 프로젝트에 맞게 커스텀돼 있고, 나머지 항목(`default_status`, `statuses`, `date_format` 등)은 backlog.md 기본값을 그대로 쓴다                                                                                                          |

## 5. TASK-55 / TASK-61과의 관계

이 문서(TASK-62.1)가 다루는 "worktree 구조 재확인" 내용은 **TASK-55**(`docs/plans/plan-v18.md`
작성 — worktree 재확인 + 마일스톤전환 PR 게이트. 원래 plan-v17로 계획됐으나 TASK-67에서
그 번호를 `/clear` 타이밍 가이드라인 복구에 먼저 쓰면서 v18로 재배정됨)와 스코프가 겹친다.
TASK-55는 plan 문서 시리즈(`docs/plans/plan-vN.md`)에 규칙으로 못 박는 것이 목적이고, 이
문서는 그 규칙들을 포함해 실제 운영 방법을 사람이 읽기 쉬운 형태로 한 곳에 모아 설명하는
것이 목적이다 — 서로 다른 용도지만 "worktree 3개(implementer/reviewer/verify) + 각자
브랜치"라는 사실 자체는 두 문서 모두에서 동일하게 다뤄야 하므로, plan-v18이 작성되면 이
문서와 내용이 어긋나지 않는지 상호 확인이 필요하다.

**TASK-61의 AC는 이번에 확정된 logger 역할에 맞게 이미 수정 완료됨(TASK-67에서 반영).**
logger는 implementer/reviewer/verify와 달리 "진행 로그 (logger)"라는 이름의 **backlog doc**을
갖지 않는다 — logger가 다루는 건 요약·판단이 개입되지 않은 raw 원문이고, 이건 backlog
doc(구조화된 판단/결론 문서)의 성격과 맞지 않기 때문이다. logger의 출력물은 backlog doc이
아니라 **git으로 추적되는 평문 로그 파일(`logs/raw-session-log.md`)**이다(위 2번 섹션 logger
항목 참고). TASK-61의 AC는 "backlog doc 3개(진행 로그 implementer/reviewer/verify) 신규 생성

- logger는 `logs/raw-session-log.md` 신규 생성(git 추적, doc 아님)"으로 반영되어 있다.
