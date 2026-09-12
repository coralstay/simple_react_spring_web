---
id: TASK-62.5
title: scripts/session-prompts/logger.md 작성
status: Done
assignee:
  - '@claude'
created_date: '2026-09-12 06:38'
updated_date: '2026-09-12 10:41'
labels: []
dependencies: []
modified_files:
  - scripts/session-prompts/logger.md
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
logger 세션(별도 worktree 없이 메인 저장소 경로에서 동작)을 claude "$(cat scripts/session-prompts/logger.md)"로 기동할 때 첫 메시지로 들어갈 프롬프트 원문. logger는 순수 수집 장치로, 스스로 코드/backlog를 읽고 요약·판단하지 않는다 — implementer/reviewer/verify가 SendMessage로 전달하는 '왜 이 문서/커밋/판정을 만들었는지'에 대한 원문 설명을 가공 없이 그대로 logs/raw-session-log.md(git으로 추적)에 타임스탬프+발신 세션명과 함께 append만 한다.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 파일 맨 앞이 '/loop 60m '으로 시작한다
- [x] #2 코드/backlog를 수정하지 않고 오직 logs/raw-session-log.md에 append만 한다는 제약이 명시된다
- [x] #3 다른 세션이 SendMessage로 전달한 원문을 요약/평가/생략 없이 그대로, 타임스탬프와 발신 세션명을 붙여 기록하라는 지시가 포함된다
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
scripts/session-prompts/logger.md 작성 완료. /loop 60m으로 시작(AC1), logs/raw-session-log.md에만 append하고 그 외 코드/backlog 수정 금지 명시(AC2), SendMessage로 받은 원문을 요약/평가/생략 없이 타임스탬프+발신 세션명과 함께 기록하라는 지시 포함(AC3). 세션명은 실제 살아있는 peer session인 claude-web-application-logger로 명시. scripts/test-all.sh 통과 확인(frontend vitest 0 tests, backend gradle BUILD SUCCESSFUL).
<!-- SECTION:FINAL_SUMMARY:END -->
