---
id: doc-10
title: 'TASK-62 사용자 피드백: logger 역할 정의 및 세션 부트스트랩 설계 결정'
type: specification
created_date: '2026-09-12 10:41'
updated_date: '2026-09-12 10:42'
---
# TASK-62 사용자 피드백: logger 역할 정의 및 세션 부트스트랩 설계 결정

TASK-62(다중 세션 부트스트랩: docs/SESSIONS.md + scripts/bootstrap-sessions.sh) 기획/실행 중 사용자가 직접 준 피드백과 그 근거를 원문 취지 그대로 기록한다. backlog/docs/feedback/ 신규 디렉토리의 첫 문서 — 앞으로 사용자 피드백은 이 경로 아래 "피드백 한 건마다 별도 doc"으로 남긴다(공유 단일 로그 파일 방식은 doc-3/TASK-61에서 이미 충돌 문제가 있었던 패턴이라 지양).

## 1. logger 세션 역할 정정

최초 plan 초안에서는 logger를 "다른 세션 활동을 관찰하고 recap을 남기는 세션" 정도로 느슨하게 정의했다. 사용자가 이를 명확히 정정:

> 로거의 역할은 나머지 세 세션이 문서를 만들 때 왜 그런 문서들을 만들고 코드를 만들었는지 파악하기 위해 그들의 대화내용과 그 근거를 저장하는 장치야. 판단은 하지 않고 raw 데이터를 수집하는 장치지.

즉 logger는:
- 스스로 코드/backlog를 읽고 요약·판단하지 않는다.
- implementer/reviewer/verify가 SendMessage로 전달하는 "왜 이렇게 했는지"에 대한 원문 설명을 가공 없이 그대로 수집·보관한다.
- 요약/평가/생략 금지 — 순수 raw 데이터 저장 장치.

## 2. logger 로그 파일의 git 추적 여부

최초 설계안은 logger의 출력물(`logs/raw-session-log.md`)을 git 미추적(.gitignore)으로 두려 했다. 사용자가 정정:

> 로거도 함께 깃에 추적하는걸로하자.

→ `logs/raw-session-log.md`는 `.gitignore`에 추가하지 않고 git으로 정상 커밋/추적한다. (단, backlog doc은 아니다 — 이유는 아래 4번 참고.)

## 3. 실행 방식: 서브에이전트 위임 원칙 재확인

backlog/ 디렉토리 조사 작업 도중 사용자가 짧게:

> 서브에이전트로 돌려

→ 사용자의 글로벌 방침(`~/.claude/CLAUDE.md`)대로, 조사/실행 작업은 인라인 처리가 더 저렴해 보여도 기본적으로 서브에이전트(격리 워크트리)에 위임하는 걸 기본값으로 삼는다는 걸 이번에도 재확인.

## 4. TASK-61과의 실제 불일치 발견

logger 역할이 "raw 데이터를 판단 없이 수집"하는 장치로 확정되면서, TASK-61의 현재 AC #1("backlog doc 4개: 진행 로그 implementer/reviewer/verify/logger 신규 생성")이 logger에도 다른 3개 역할처럼 backlog doc을 준다고 잘못 전제하고 있다는 게 드러났다. logger의 출력은 backlog doc이 아니라 git 추적되는 평문 로그가 맞다 — TASK-61 실행 시점에 AC #1을 수정해야 한다.

## 5. 사용자 피드백 기록 방식 자체에 대한 결정 (이 문서를 만들게 된 배경)

TASK-62 진행 중 사용자가 물음:

> 사용자 요청 피드백을 문서로 남기고싶어. 어떤방법이있나?

→ `backlog doc create "<제목>" -p feedback`으로 `backlog/docs/feedback/` 아래에 문서를 만들고, 관련 task에 `backlog task edit <ID> --doc <docId>`로 링크하는 방식을 채택. doc-3(공유 단일 로그)가 TASK-61에서 역할별로 분리돼야 했던 선례를 근거로, "주제/사건 하나당 별도 doc" 방식을 기본값으로 추천하고 사용자가 승인.
