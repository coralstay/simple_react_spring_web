# plan-v9 — reviewer M1 코드리뷰(doc-4) 반영 사항

이전 버전: plan-v1~v8.md (모두 변경하지 않음)

## 변경 사항

reviewer 세션의 M1 코드 리뷰 결과(doc-4)를 반영한다.

### M2 착수 전 필수 조치
1. **SecurityConfig 선행 필요**: 공개 엔드포인트(TASK-6 `GET /api/case-study`, TASK-13
   `POST /api/inquiries`)는 최소 permitAll `SecurityConfig`(TASK-15.1)가 먼저 있어야
   Spring Security 기본 HTTP Basic에 막히지 않는다. `backlog task edit TASK-6/TASK-13 --dep
   TASK-15.1`로 의존성을 걸어뒀다 — TASK-15.1을 M2에서 가장 먼저 처리한다.
2. **Vitest jsdom 환경 누락**: TASK-1.5(passWithNoTests)와 별개로 `vite.config.ts`에
   `test.environment: 'jsdom'`/setupFiles가 없어 실제 컴포넌트 테스트 작성 시 깨진다 —
   TASK-1.6으로 분리해 생성함.
3. TASK-1.3 Final Summary의 포트 오기(5199→5173 정정)는 notes로 수정 기록.

### leaf=파일1개 불변식 명확화(reviewer 권고)
스캐폴딩 도구(예: `pnpm create vite`, Spring Initializr 스타일 생성)가 원자적으로 여러 파일을
동시에 만들어내는 경우, 그 부산물은 **대표 파일 leaf의 범위에 포함되는 것으로 간주**하고
매번 개별 판단하지 않는다. 단, 서브에이전트는 Final Summary에 부산물 파일 목록을 명시해야 한다.

### git-format taskPrefix — 근본 원인 확인 및 조치
`.git/config`의 `gitformat.taskPrefix`는 로컬 오버라이드이고, 공유 기본값(`gitformat.conf`)도
`core.hooksPath`가 가리키는 **전역** git-format 저장소 안에 있어 둘 다 이 프로젝트를 새로 clone하면
사라진다. 추적되는 프로젝트 파일로는 옮길 수 없는 구조라, 대신 **추적되는 setup 스크립트**
(`scripts/setup-dev-env.sh`, TASK-4.3)로 `git config gitformat.taskPrefix TASK`를 실행하게
만들고, 클라우드 크론 부트스트랩 단계와 README 최초 셋업 섹션에 이 스크립트 실행을 포함시킨다.

### M3~M5 전까지 처리(비차단, doc-4 상세)
- application.yml 크리덴셜 평문/프로파일 미분리 → TASK-43(Actuator+환경분리)에서 처리
- ddl-auto만 있고 마이그레이션 도구 없음 → TASK-19.1에서 Flyway/Liquibase 추가하며 처리
  (TASK-19.1에 백레퍼런스 기록 완료)
- docker-compose 0.0.0.0 바인딩/포트 하드코딩, 프런트 스캐폴딩 잔여물 정리 → 각 담당 task에서
  처리, 별도 마감 기한 없음

## 영향받는 범위
- backlog: TASK-6/TASK-13에 TASK-15.1 의존성 추가, TASK-1.6/TASK-4.3 신규 leaf 생성,
  TASK-1.3/TASK-19.1에 notes 추가
