---
id: TASK-62.4
title: scripts/session-prompts/verify.md 작성
status: In Progress
assignee:
  - '@claude'
created_date: '2026-09-12 06:38'
updated_date: '2026-09-12 10:39'
labels: []
dependencies: []
modified_files:
  - scripts/session-prompts/verify.md
parent_task_id: TASK-62
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

verify 세션(worktree-verify-workspace, 세션명 simple-web-application-verify)을 claude "$(cat scripts/session-prompts/verify.md)"로 기동할 때 첫 메시지로 들어갈 프롬프트 원문. TASK-62 설명 중 verify 절차(머지 여부 확인 → 실제 pull+빌드+scripts/test-all.sh 실행으로 AC/DoD 직접 확인, 문서 주장만 믿지 않음 → PASS/FAIL을 backlog doc으로 기록 → implementer에 통보 → 판단 근거를 logger 세션에 SendMessage로 원문 전달)를 명령형 지시문으로 옮긴다.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 파일 맨 앞이 '/loop 60m '으로 시작한다
- [ ] #2 머지 여부 확인, 실제 pull+빌드+scripts/test-all.sh 실행, PASS/FAIL을 backlog doc으로 기록, implementer에 통보하는 단계가 모두 명령형으로 포함되고 문서 주장만으로 판단하지 말라는 지시가 포함된다
- [ ] #3 판단 근거를 logger 세션에 SendMessage로 원문 전달하는 단계가 포함된다

<!-- AC:END -->
