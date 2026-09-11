#!/usr/bin/env bash
# claude-rails testCommand: 프런트엔드(pnpm test/vitest) + 백엔드(gradlew test)를 모두 실행한다.
# 아직 스캐폴딩되지 않은 컴포넌트는 건너뛰고(skip), 존재하는 컴포넌트의 테스트가
# 실패하면 non-zero로 종료한다.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

overall_status=0

run_frontend_tests() {
  # package.json에 "test" 스크립트가 정의되어 있으면 그걸 쓰고, 아니면
  # vitest를 직접 실행한다(비대화형으로 한 번만 돌리는 --run 옵션).
  if [ -f package.json ] && grep -qE '"test"[[:space:]]*:' package.json; then
    pnpm test
  else
    pnpm vitest --run
  fi
}

if [ -d "frontend" ]; then
  echo "[test-all] frontend/ 발견 — 프런트엔드 테스트 실행"
  if ! (cd frontend && run_frontend_tests); then
    echo "[test-all] 프런트엔드 테스트 실패"
    overall_status=1
  fi
else
  echo "[test-all] frontend/ 디렉토리가 아직 없어 프런트엔드 테스트를 건너뜁니다 (skip)."
fi

if [ -d "backend" ]; then
  echo "[test-all] backend/ 발견 — 백엔드 테스트 실행"
  if ! (cd backend && ./gradlew test); then
    echo "[test-all] 백엔드 테스트 실패"
    overall_status=1
  fi
else
  echo "[test-all] backend/ 디렉토리가 아직 없어 백엔드 테스트를 건너뜁니다 (skip)."
fi

exit "$overall_status"
