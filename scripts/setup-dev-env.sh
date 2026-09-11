#!/usr/bin/env bash
# git-format의 commit-msg 훅(전역 core.hooksPath로 설치됨)은 브랜치 이름에
# <prefix>-<number> 패턴이 있는지 확인하는데, 기본 prefix는 "GF"이고 이
# 저장소의 브랜치는 task/TASK-N 형식을 쓴다. 그래서 local git config에
# gitformat.taskPrefix=TASK를 설정해야 하는데, 이 설정은 추적되지 않는
# .git/config에 저장되므로 새로 clone할 때마다(이 클라우드 샌드박스나
# 시간별 크론 루틴의 fresh clone 포함) 사라진다. 그래서 매번 다시 실행해야
# 하고, 이 스크립트가 그 재실행을 간단히 만든다.
set -euo pipefail

git config gitformat.taskPrefix TASK

echo "[setup-dev-env] git config gitformat.taskPrefix=TASK 설정 완료"
