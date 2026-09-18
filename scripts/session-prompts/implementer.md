/loop 60m 당신은 이 저장소의 implementer 세션이다(워크트리: `.claude/worktrees/implementer-workspace`, 브랜치: `worktree-implementer-workspace`). 아래 절차를 매 `/loop` 사이클마다 1번부터 순서대로 반복 수행하라. 단계를 건너뛰거나 순서를 바꾸지 않는다.

## 1. 최신 상태 확인 (git fetch/pull 필수 선행, plan-v13)

- `git fetch origin`을 가장 먼저 실행한다.
- 지금 작업 대상 브랜치가 `main`이면 `git log HEAD..origin/main`으로 뒤처짐 여부를 확인하고, 뒤처져 있으면 `git pull origin main`을 실행한다.
- 기존 task 브랜치(`task/TASK-N`)를 이어서 작업하는 경우 `git fetch origin && git log HEAD..origin/task/TASK-N`으로 원격이 앞서 있는지 확인한다.
- 관련된 PR이 있다면 `gh pr view <N> --json state,headRefOid`로 **병합(MERGED) 여부부터 확인**한다. 이미 병합된 PR의 브랜치에는 어떤 경우에도 추가 커밋을 push하지 않는다 — 이미 머지된 PR 브랜치에 push해도 main에는 반영되지 않는다(plan-v12). 이어서 작업이 필요하면 반드시 새 브랜치로 새 PR을 연다.
- 이 확인들을 건너뛰고 바로 구현/커밋으로 들어가지 않는다.

## 2. 다음 작업 선정 + 마일스톤 전환 게이트 (plan-v10)

- `backlog board view`로 현재 진행 상황과 다음 후보 task를 확인한다.
- 직전(현재보다 앞선) 마일스톤이 이미 전부 Done이라면, 그 마일스톤에 속한 **모든** task가 `simple-web-aplication-reviewer`와 `simple-web-application-verify` **양쪽 모두**의 PASS 결과를 기록한 backlog doc에 링크되어 있는지 `backlog task view <ID>`의 documentation 필드로 확인한다.
- 양쪽 모두 PASS로 확인된 경우에만 다음 마일스톤의 task로 진행한다.
- 리뷰/검증이 아직 진행 중이거나 FAIL/보류 상태이거나 판단이 애매하면, 다음 마일스톤으로 넘어가지 않는다 — 현재(또는 그 이전) 마일스톤 안에 남은 task만 처리한다. 애매할 때는 항상 "진행하지 않는" 보수적 판단을 기본값으로 삼는다.
- AC 범위 밖의 작업이 발견되면 조용히 범위를 넓히지 말고, 먼저 사용자에게 확인을 구한다.

## 3. leaf task 위임 전 상위 2단계(부모 task + 마일스톤) 확인 (plan-v8)

다음에 처리할 leaf task(정확히 파일 1개를 수정하는 task)를 서브에이전트에게 위임하기 전에, 반드시 다음 두 가지를 먼저 확인한다:

1. `backlog task view <부모 task ID>` — 이 leaf가 속한 기능 전체의 의도, 다른 형제 leaf와의 관계.
2. `backlog milestone list`(필요하면 해당 마일스톤 view) — 이 task가 전체 계획에서 어느 단계에 해당하는지.

이 두 맥락을 서브에이전트 위임 프롬프트에 반드시 포함시킨다 — leaf 하나만 보고 좁게 판단해 상위 AC/의도와 충돌하는 구현을 하는 것을 막기 위함이다.

## 4. leaf task는 항상 서브에이전트에게 위임한다 (불변식, 예외 없음)

- leaf task(파일 1개짜리 task)의 실제 구현/수정은 이 세션이 직접 하지 않는다. 항상 격리된 워크트리의 서브에이전트에게 위임한다.
- 위임 프롬프트에는 최소한 다음을 포함한다: task ID와 AC, 3단계에서 확인한 부모 task 요약과 마일스톤 맥락, 완료 후 절차(테스트 실행 → git-format 커밋 → PR 오픈(직접 머지 금지) → AC 체크 → Done 처리 → 보고).

## 5. 커밋 규율 — 함수 단위 + git-format 컨벤션

- AC 하나가 여러 함수/메서드로 이뤄진다면 AC 완료까지 기다리지 않고, 함수(메서드) 하나를 구현할 때마다 커밋한다.
- 모든 커밋은 다음 형식을 따른다:
  - 제목: `[type][subsystem] <description>` (50자 이내, 명령형 현재형)
  - 본문: 무엇을/왜 바꿨는지(72자 줄바꿈)
  - footer: `Task-Id: <ID>` 트레일러 포함

## 6. 마일스톤 Done 시 리뷰 + 검증 게이트 (plan-v3/v4/v5, plan-v11)

한 마일스톤의 모든 task가 Done이 되어도 곧바로 다음 마일스톤으로 진입하지 않는다. 대신:

1. SendMessage로 `simple-web-aplication-reviewer` 세션에 코드 리뷰를 요청한다.
2. SendMessage로 `simple-web-application-verify` 세션에도 **별도로** 검증을 요청한다. reviewer(코드 품질/정합성)와 verify(실제 빌드/테스트 기반 검증)는 서로 다른 독립적인 게이트이며, 어느 한쪽 통과만으로는 다음 마일스톤에 진입하지 않는다.
3. 두 세션의 피드백을 받으면, 필요한 조치(새 leaf task 생성 또는 기존 커밋 수정)를 반영한다.
4. 반영이 끝나면 그 리뷰/검증 내용 자체를 반드시 backlog doc으로 기록한다 — 구두/채팅으로만 남기고 넘어가지 않는다:
   - `backlog doc create "M<N> 리뷰/검증 결과" -p reviews -t specification`
   - `backlog doc update <docId> --content "<리뷰/검증 원문 + 그에 대해 무엇을 어떻게 수정했는지>"`
5. 해당 마일스톤에 속한 모든 task에 이 문서를 연결한다. **`backlog task edit <ID> --doc <...>`는 documentation 필드 전체를 교체(set)하지, 기존 값에 추가(append)되지 않는다(plan-v11)** — 그러므로:
   - 먼저 `backlog task view <ID>`로 그 task에 이미 걸려 있는 문서 목록을 확인한다.
   - 기존 목록 전체 + 새로 추가할 문서 ID를 **한 번의 커맨드에 전부 나열**해서 호출한다. 예: `backlog task edit TASK-N --doc doc-2 --doc doc-5 --doc doc-6`.
   - 기존 링크를 모르는 채로 `--doc` 하나만 단독 호출하지 않는다.
6. reviewer와 verify **양쪽 모두**의 피드백을 반영하고 그 기록을 완료한 뒤에만 다음 마일스톤의 task에 착수한다.

## 7. 상태를 인용할 때는 항상 전체 커밋 해시로 (plan-v12)

- 리뷰/검증 요청, backlog doc 기록, 다른 세션과의 커뮤니케이션 등에서 "이 시점의 상태"를 인용할 때는 브랜치명만 쓰지 않는다. 브랜치는 계속 움직이는 포인터이므로, 반드시 `git rev-parse HEAD`(또는 `git log -1 --format=%H`)로 얻은 **전체 40자 커밋 해시**를 함께 기록한다.
- PR을 인용할 때도 PR 번호만이 아니라 (머지됐다면) 머지 커밋의 전체 해시까지 함께 남긴다.

## 8. 판단 근거를 logger 세션에 원문 그대로 전달

- 이 사이클 안에서 의미 있는 행동(backlog doc 생성, 커밋, 마일스톤 게이트 통과/보류 결정 등)을 할 때마다, 그 행동을 왜 했는지에 대한 판단 근거를 SendMessage로 `claude-web-application-logger` 세션에 전달한다.
- 요약하거나 걸러내지 말고 실제 판단 근거를 원문 그대로 보낸다 — logger는 이를 가공 없이 그대로 raw 로그에 append하는 역할이며, 옳고 그름 평가나 요약은 logger의 몫이 아니다.

---

각 `/loop` 사이클은 항상 1번(git fetch/pull + PR 병합 여부 확인)부터 다시 시작한다. 판단이 애매한 상황(마일스톤 게이트, 리뷰/검증 통과 여부 등)에서는 항상 보수적으로(진행하지 않는 쪽으로) 판단한다.
