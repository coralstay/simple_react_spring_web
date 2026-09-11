---
id: doc-4
title: M1 리뷰 결과
type: specification
created_date: '2026-09-11 04:24'
updated_date: '2026-09-11 04:26'
---
# M1(TASK-1~4) 코드 리뷰 결과

리뷰자: `simple-web-aplication-reviewer` 세션
대상: PR #1(TASK-2 백엔드), #2(TASK-3 docker-compose), #3(TASK-4 claude-rails), #4(TASK-1 프런트) — 전부 main에 이미 merge됨
방법: `/code-review high` (8-angle 서브에이전트) 각 PR diff 대상 실행 + `docs/plans/plan-v1~v5.md`, backlog 상위 task/마일스톤(m-0) 대조, `doc-2`(verify 세션 결과)와 교차 확인

## 결론

**M2 착수 전 반드시 처리할 것 3건**, 권고 사항 다수. verify 세션(doc-2)의 FAIL 판정과 별개로,
코드 품질/기획 정합성 관점에서 추가로 발견한 이슈 위주로 정리합니다. doc-2와 겹치는 항목(AC
미체크, test-all.sh exit 1)은 이미 처리 중이라 아래에서는 남은 부분만 언급합니다.

## M2 착수 전 필수 (Blocking)

### 1. Spring Security 자동 설정이 M2의 공개 엔드포인트를 깰 것
`backend/build.gradle.kts`에 `spring-boot-starter-security`가 추가돼 있는데 `SecurityConfig`
빈이 전혀 없습니다. 이 상태로는 Spring Boot가 모든 엔드포인트에 HTTP Basic 인증을 자동 적용하고
콘솔에 랜덤 비밀번호를 찍습니다. M2에서 만들 `GET /api/case-study`, `POST /api/inquiries`는
**인증 불필요 공개 엔드포인트**로 설계돼 있는데(plan-v1), 지금 상태로 구현하면 그대로 401이 납니다.
TASK-15(JWT 인증)가 별도 마일스톤(M3)이라 해도, 최소한 "공개 경로는 permitAll, 나머지는 나중에
TASK-15가 마저 구성"하는 최소 `SecurityConfig`를 M2 시작 시점에 넣어야 합니다.

### 2. 프런트 Vitest 테스트 환경(jsdom) 설정 누락 — TASK-1.5와 별개 이슈
TASK-1.5(passWithNoTests)는 "테스트가 없을 때" 문제만 다룹니다. 그런데 `frontend/vite.config.ts`에
`test.environment: 'jsdom'`/`setupFiles`가 전혀 없는 채로 `jsdom`/`@testing-library/react`/
`@testing-library/jest-dom`만 devDependency로 들어가 있습니다. M2에서 실제로 `Hero.test.tsx`
같은 컴포넌트 테스트를 처음 작성하는 순간 `document is not defined`로 즉시 깨집니다. TASK-1.5에
이 설정을 포함시키거나(권장) 별도 leaf task(TASK-1.6)로 분리해서 M2 착수 전에 끝내주세요.
(추가로, plan-v1의 "jsdom에 IntersectionObserver 없음" 리스크 항목도 같은 setupFiles에서
폴리필 처리가 필요합니다 — TASK-14 useInView 작업 전에 준비해두면 좋습니다.)

### 3. TASK-1 Final Summary의 근거 하나가 재현되지 않음
TASK-1.3 Final Summary: "curl http://localhost:5199/ HTTP 200 확인"이라고 되어 있는데, 커밋된
`vite.config.ts`/`package.json` 어디에도 5199 포트 설정이 없고 Vite 기본값은 5173입니다. 실제로
이 코드로 `pnpm dev`를 재현하면 5173에서 뜹니다. 기능상 문제는 없지만(스캐폴딩 자체는 정상
동작), Final Summary는 "나중에 재현 가능한 객관적 증거"여야 하는데 이 항목은 재현이 안 됩니다.
TASK-1/1.1~1.4 커밋 해시도 리베이스로 재작성돼 원래 Final Summary가 인용한 해시들이 더 이상
존재하지 않습니다(리베이스 자체는 정상이지만, Final Summary에 커밋 해시를 직접 박아두면 이런
식으로 죽은 링크가 됩니다 — 앞으로는 해시 대신 재현 커맨드/결과를 적는 걸 권장합니다). 이 항목은
텍스트 수정만으로 끝나는 가벼운 정정 건입니다.

## 권고 (M2 진행에는 안 막지만 M3~M5 전에는 필요)

- **`application.yml` DB 크리덴셜 평문 + 프로파일 미분리**: plan-v1이 명시한
  `application-dev.yml`/`application-prod.yml` 분리가 아직 없습니다. 로컬 전용이라 지금 당장은
  낮은 심각도지만, M5(CI/CD)에서 실제 시크릿을 다루기 전에는 반드시 분리해야 합니다.
- **`ddl-auto: update`뿐, 마이그레이션 도구 없음**: M3의 Booking EXCLUDE 제약(`daterange`+
  `btree_gist`)은 Hibernate ddl-auto로 생성 불가능합니다. M3 착수 전에 Flyway/Liquibase 도입이
  필요합니다(TASK-19.1 범위에 자연스럽게 포함될 것 같지만, 마이그레이션 도구 자체 세팅은 그보다
  먼저 필요할 수 있어 미리 알려드립니다).
- **`docker-compose.yml`이 0.0.0.0:5432로 기본 크리덴셜(postgres/postgres) 노출**: 로컬 개발
  전용이라 심각하진 않지만 `127.0.0.1:5432:5432`로 바인딩 범위를 좁히는 걸 권장합니다. 포트
  하드코딩도 로컬에 이미 Postgres가 떠 있는 개발자 환경에서 충돌 가능 — `${POSTGRES_PORT:-5432}`
  형태로 오버라이드 가능하게 하면 좋습니다.
- **프런트 스캐폴딩 잔여물 정리**: `App.css`(184줄), `assets/hero.png`, `assets/react.svg`,
  `assets/vite.svg`, `public/icons.svg`가 어디서도 참조되지 않는 Vite 템플릿 기본 산출물입니다.
  `frontend/README.md`도 템플릿 원문 그대로입니다. M2에서 실제 섹션 컴포넌트 작업 들어가기 전에
  한 번 정리하면 이후 diff가 깨끗해집니다. `index.html`의 `lang="en"`도 실제 콘텐츠가 한국어이므로
  `lang="ko"`로 바꿔야 스크린리더/번역 도구가 올바르게 동작합니다.
- **`vite.config.ts`의 API 프록시 타겟이 `"http://localhost:8080"` 하드코딩**: 지금은 문제
  없지만 배포/스테이징 환경이 생기면 env var(`loadEnv`)로 빼두는 게 나중에 편합니다.

## 질문 3건에 대한 답변

**Q1. TASK-3.1의 btree_gist AC를 TASK-19.1로 이연 + comment로 사유 문서화** — 적절한 판단입니다.
verify 세션도 doc-2에서 "정당한 스코프 결정"으로 동의했습니다. 다만 TASK-19.1 쪽 설명에도
"이 AC는 TASK-3.1에서 이연됨"이라고 역참조를 남겨두면, 나중에 TASK-19.1만 단독으로 보는 사람도
왜 이 항목이 여기 있는지 바로 알 수 있어 더 좋습니다(선택사항).

**Q2. git-format taskPrefix를 로컬 `git config`로 임시 해결** — 맞는 임시조치지만, 말씀하신 대로
클라우드 크론 에이전트가 새로 clone하면 다시 막힙니다. `.git/config`는 추적 안 되니, git-format
자체가 프로젝트 루트에 추적 가능한 설정 파일(예: `.gitformat.json` 류)을 지원하는지 먼저 확인해
보시고, 지원한다면 그쪽으로 옮기세요. 지원하지 않는다면 `scripts/test-all.sh`처럼 추적되는
`scripts/setup.sh`(또는 README "최초 셋업" 섹션)에 `git config gitformat.taskPrefix TASK`
명령을 명시적으로 남기고, 크론 에이전트 부트스트랩 절차에 이 스크립트 실행을 포함시키는 걸
권장합니다.

**Q3. leaf task=파일 1개 불변식 vs 스캐폴딩 도구의 부산물(여러 파일 동시 생성)** — 위반으로
보지 않습니다. `--modified-file`로 지정한 대표 파일이 그 leaf task의 "의도적 작업 결과물"이고,
나머지(예: `gradlew`/`gradlew.bat`/`gradle-wrapper.jar`, `tsconfig.node.json` 등)는 도구가
원자적으로 만들어내는 필수 보일러플레이트라 실질적으로 분리 불가능합니다. 다만 이걸 매 leaf마다
에이전트가 개별 판단하게 두지 말고, "스캐폴딩 도구의 원자적 산출물은 대표 파일의 leaf 범위에
포함되며 Final Summary에 부산물 목록을 명시한다"는 규칙을 plan 문서(또는 decision)에 한 줄
못박아두는 걸 권장합니다 — 지금처럼 매번 잘 판단하고 있지만, 기준이 문서화되어 있지 않으면
나중에 다른 에이전트/세션이 다르게 판단할 여지가 있습니다.

## 참고: 제가 처음에 잘못짚었던 부분

test-all.sh의 `grep -qE '"test"[[:space:]]*:'`가 "npm 기본 stub 스크립트와 우연히 매치돼
잘못된 분기를 탄다"는 가설을 초안에서 세웠었는데, TASK-4.2 최종 노트를 보니 실제 원인은 그게
아니라 `frontend/package.json`의 `"test": "vitest run"`이 정상적으로 실행되고, vitest 자체가
"테스트 파일 0개"를 기본적으로 실패(exit 1)로 처리하는 것이었습니다(TASK-1.5로 수정 중). grep
로직 자체는 문제 없었습니다 — 제 가설을 정정합니다.
