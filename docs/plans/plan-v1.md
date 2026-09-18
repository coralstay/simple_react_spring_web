# 건축·실내건축·숙박업 경험을 녹인 단일 케이스 스터디 사이트

## Context

사용자는 건축 현장 2년, 실내건축 현장 5년(둘 다 일용직/직접 시공 참여 — 설계자가 아닌 현장 실무자로서의 경험), 숙박업 운영 3년의 경력을 갖고 있다. **중요한 사실관계**: 시공 경력(건축 2년 + 실내건축 5년)은 남의 여러 현장에서 쌓은 것이고, 지금 운영 중인 숙소는 그 현장들과 무관한 완전히 별개의 공간이다 — 즉 "내가 지은 건물을 내가 꾸며서 지금 운영한다"는 하나의 건물 서사는 사실이 아니다. 이 구조를 왜곡 없이 정직하게 반영해야 한다.

그래서 "단일 케이스 스터디"는 **지금 실제로 운영 중인 숙소 하나를 진짜 중심(case)으로 삼고**, 건축·실내건축 현장 경험은 "이 숙소를 지었다"는 주장이 아니라 **"이 숙소를 운영하는 지금의 안목과 디테일을 만든 배경 경험"**으로 앞부분에 배치하는 구조로 재설계한다. 즉 서사는 "여러 현장에서 몸으로 배운 것 → 그 눈썰미로 지금 이 숙소를 고르고 운영하는 방식"이라는 인과관계이지, 한 건물의 시공사→운영자 서사가 아니다.

**최종 목적은 실무에 바로 적용 가능한 수준의 포트폴리오**다. 다만 흔한 CRUD 토이 프로젝트가 아니라, 실제 스테이 랜딩 페이지처럼 느껴지는 제품(포트폴리오 겸 숙소 마케팅 페이지)을 만들어 스크롤을 따라가면 배경 경험→운영 철학까지의 서사가 드러나는 구조로 차별화한다. "현장 경험을 소프트웨어 요구사항으로 번역했다"는 구조 자체가 실무 수준의 요구사항 분석·설계 역량을 보여주는 지점이다. 현재 실제 사진·시공 과정·운영 데이터(점유율, 리뷰 등)는 준비되어 있지 않으므로, 이번 구현은 **현실적인 더미(가짜) 콘텐츠**로 전체 구조를 채우고, 추후 실제 자료로 교체 가능하게 데이터 구조를 분리해서 설계한다.

작업 디렉토리(`/Users/flynn_macpro/simple_react_spring_web`)는 현재 `.tool-versions`(nodejs lts, pnpm 10.33.0, java temurin-25.0.2, gradle 9.4.1)만 있는 빈 프로젝트로, 이름과 툴 버전으로 볼 때 React 프런트엔드 + Spring Boot 백엔드 스택을 의도하고 있다.

## 톤/프레이밍 원칙

- 건축·실내건축 챕터는 "이 숙소를 지었다"가 아니라 **"나를 만든 현장들"** — 여러 다른 현장에서 직접 손으로 자재를 만지고 시공하며 배운 디테일과 실전 감각을 다룬다. 특정 건물의 전/후 비교가 아니라, 일반적인 현장 경험(자재, 공정, 협업)을 정직하게 서술.
- 실내건축(5년)이 가장 분량이 많고 디테일한 챕터, 건축(2년)이 가장 가벼운 챕터.
- 숙박업 운영(3년) 챕터가 **진짜 케이스의 중심** — 지금 실제로 운영 중인 그 숙소를 다루며, 앞선 현장 경험이 운영/관리에 구체적으로 어떻게 반영되는지(예: 하자를 미리 알아보는 눈, 마감재 유지보수 판단, 시공업체와의 소통) 연결하는 "브릿지" 섹션으로 앞 챕터들과 이어붙인다.
- 전체 톤은 실제 스테이 마케팅 페이지처럼 감각적으로(사진 중심, 문의/예약 유도 CTA 포함) 만들되, "이 사람은 현장을 알아서 공간을 다르게 운영한다"는 신뢰를 주는 것이 핵심 메시지.

## 기술 스택 & 구조

```
simple_react_spring_web/
  .tool-versions        (기존)
  frontend/             pnpm + Vite + React + TS
  backend/              Gradle(Kotlin DSL) + Spring Boot + Java 25
```

- **프런트엔드**: `pnpm create vite frontend --template react-ts`. 애니메이션은 `@react-spring/web`(프로젝트명과도 맞음)로 스크롤 인뷰 리빌 처리, 직접 만든 `useInView` 훅(IntersectionObserver) 사용. 테스트는 **Vitest + React Testing Library**.
- **백엔드**: **Spring Web MVC** + **Spring Data JPA** + **Spring Security(JWT)** 조합의 Spring Boot(Gradle, Java 25 툴체인, 시작 시 Boot 3.5.x 라인으로 Java 25 지원 여부 확인 필요), DB는 **PostgreSQL**, 필요한 부분(엔티티, DTO 등 보일러플레이트)에 **Lombok** 사용, 테스트는 **JUnit 5 + ArchUnit**
  - `GET /api/case-study` — 공개 케이스 스터디 콘텐츠를 `content/case-study-ko.json` 리소스 파일에서 읽어 반환 (콘텐츠는 git으로 버전관리되는 단일 JSON, DB 테이블 불필요)
  - `POST /api/inquiries` — 문의/예약 문의 폼 제출을 PostgreSQL에 저장 (인증 불필요, 공개 엔드포인트)
  - `POST /api/auth/login` + 대시보드 API 일체(아래 "운영 대시보드" 참고) — JWT 인증 필요
  - 로컬 개발용 PostgreSQL은 `docker-compose.yml`로 컨테이너 하나 띄우는 방식 사용 (별도 설치 불필요), `application.yml`에 접속 정보 분리
  - 배포 시 `frontend/dist`를 Spring 정적 리소스로 포함해 단일 jar로 서빙 (CORS 이슈 없음, 개발 중엔 Vite 프록시로 `/api` 연결)

## 콘텐츠 데이터 모델

`frontend/src/content/types.ts`와 `backend/.../content/case-study-ko.json`이 1:1로 대응하는 구조:

```ts
CaseStudy {
  meta: { title, subtitle, location, propertyType, tags[] }
  hero: { headline, subheadline, heroImageUrl, summaryStats: [{label, value}] }  // 예약 유도형 첫인상, 숙소는 실제 운영 중인 곳
  chapters: {
    construction: {          // 건축 2년, 여러 현장 — 가장 가벼운 챕터, "배경" 성격
      title, narrative,      // "여러 현장에서 처음 배운 것들" (특정 건물 얘기 아님)
      onSiteLessons: [{ title, description, imageUrl }]   // 몸으로 부딪힌 문제와 배운 것 (일반 현장 사진)
    },
    interior: {               // 실내건축 5년, 여러 현장 — 가장 풍부한 챕터, "배경" 성격
      title, narrative,
      materialsHandled: [{ name, imageUrl, whatILearned }],   // 직접 다룬 자재와 배운 것
      craftDetails: [{ title, description, images[] }],       // 시공 디테일/노하우
      lessonsCarriedForward: [{ title, description }]         // 지금 운영에 그대로 쓰이는 감각
    },
    bridge: {                 // 배경 경험 → 실제 운영 숙소를 잇는 연결 섹션
      title, narrative,       // "그 현장들에서 배운 눈썰미로 지금 이 공간을 고르고 운영합니다"
      renovation: {           // 실제 진행한 리모델링 사례 — 배경 경험과 지금 숙소를 잇는 가장 구체적인 증거
        title, description, beforeImageUrl, afterImageUrl, cost, period
      }
    },
    operations: {              // 숙박업 운영 3년, 지금 실제 운영 중인 그 숙소 — 진짜 케이스의 중심
      title, narrative,
      spaceDecisions: [{ title, description, imageUrl }],   // 현장 경험 덕에 다르게 판단한 운영/관리 사례
      metrics: [{ label, value, unit }],   // 점유율, 재방문율, 평점 등 (더미)
      reviewHighlights: [{ quote, rating, date }]  // (더미)
    }
  }
  closing: { reflection, contactCta }
}
```

- 모든 사진/운영 데이터는 **현실적인 더미 값**으로 채운다(플레이스홀더 스톡 이미지 + 그럴듯한 점유율/재방문율/리뷰 수치). 나중에 실제 자료로 교체할 때 이 JSON 파일과 이미지 경로만 갈아끼우면 되도록 구조를 유지. 건축/인테리어 챕터의 사진은 "이 숙소의 시공 과정"이 아니라 "여러 현장에서의 경험"을 나타내는 일반적인 이미지로 채운다 — 이 숙소를 지었다는 인상을 주는 캡션은 쓰지 않는다.

## 페이지 섹션 구성 (스크롤 순서)

1. **Hero** — 지금 실제 운영 중인 숙소의 풀블리드 사진 + 한 줄 포지셔닝 + 요약 지표(예: 재방문율), 예약 문의 CTA 노출
2. **Intro** — "여러 현장에서 몸으로 배운 뒤, 지금은 그 감각으로 숙소를 운영합니다" — 배경과 현재를 정직하게 잇는 한 문장
3. **Chapter 1: 건축 현장 경험** — 여러 현장에서 마주한 문제와 배운 것 (특정 건물 시공 서사 아님)
4. **Chapter 2: 인테리어 현장 경험(가장 풍부)** — 다룬 자재와 배운 점, 시공 디테일, 지금 운영에 이어지는 감각
5. **Bridge** — "그 경험이 지금 이 숙소를 운영하는 방식에 미친 영향" + 실제 진행한 리모델링 사례(전/후 사진, 비용, 기간) — 배경과 케이스를 잇는 가장 구체적인 증거
6. **Chapter 3: 숙박업 운영(진짜 케이스)** — 현장 경험 덕에 다르게 판단한 운영 사례, 지표 대시보드(점유율/재방문율/평점), 리뷰 하이라이트
7. **Closing** — 세 경험을 잇는 한 줄 회고 + 문의/예약 폼(이름, 연락처, 메시지, "문의 유형" 선택)

## 운영 대시보드 (사장님 페이지)

야놀자/여기어때의 "사장님 페이지"처럼, 로그인해서 실제로 쓸 수 있는 미니 운영 대시보드를 만든다. 공개 케이스 스터디(더미 콘텐츠)와는 별도의 실데이터 기반 기능이며, 운영자 1인 전용이라 복잡한 권한 체계는 불필요하다.

- **인증**: `/dashboard` 하위 전체를 JWT로 보호. 로그인 계정은 최초 실행 시 시드 데이터로 1개 생성(운영자 본인).
- **데이터 모델 (PostgreSQL, JPA 엔티티)**:
  - `Room` — 객실/유닛 단위(이름, 정원, 준공/리모델링 연도) — 객실이 하나뿐이어도 이 구조로 두면 이후 객실이 늘어도 그대로 확장됨. 건물 노후 문제는 `renovatedYear`를 기준으로 대시보드에서 "리모델링 후 N년 경과" 식으로 드러낸다.
  - `Booking` — `room` FK, 시작일/종료일, 박수, 예약 채널(직접/OTA명/현장방문), 매출액, OTA 수수료율, **`status`**(PENDING/CONFIRMED/CHECKED_IN/NO_SHOW/CANCELLED/COMPLETED) — 노쇼는 `NO_SHOW` 상태로 명시적으로 기록해 노쇼율을 집계 지표로 뽑는다. 예약-현장방문 동시 충돌 문제는 예약 출처(채널)와 무관하게 모든 `Booking`이 동일한 겹침 방지 제약(아래 "동시성 제어" 참고)을 통과해야 하므로 별도 로직 없이 자연스럽게 방지된다.
  - `Expense` — `room` FK(nullable, 건물 공통비는 null), 날짜, 카테고리(청소비/**세탁비**/린넨/소모품/관리비/수리비/기타), 금액, 메모
  - `Supply` — 객실별 비품 재고(`room` FK, 품목명, 현재 수량, 재주문 기준 수량) — 기준 수량 미만이면 대시보드에 "재고 부족" 알림 표시
  - `MaintenanceIssue` — 유지보수/노후 이슈 트래킹(`room` FK, 제목, 설명, 심각도, 상태: REPORTED/IN_PROGRESS/RESOLVED, 해결 시 연결되는 `Expense` 참조) — 건물 노후·유지보수 문제를 "발생→처리→비용 발생"의 라이프사이클로 관리
  - `RenovationProject` — 운영하며 실제로 진행한 **리모델링 사례**(`room` FK, 제목, 설명, 전/후 이미지, 총비용, 시작/완료일) — 배경(실내건축 경험)과 지금 운영 중인 숙소를 정직하게 잇는 실제 사건이므로, 공개 케이스 스터디의 Bridge/운영 챕터에서 이 데이터를 직접 노출한다(`GET /api/case-study`가 참조하거나, 별도 `GET /api/renovations`로 공개)
  - `MonthlySummary`는 별도 테이블로 저장하지 않고 위 엔티티들을 **쿼리 시점에 집계**(월별 점유율, 순이익, ADR, **노쇼율** = NO_SHOW 건수 / 전체 예약 건수) — 데이터가 적은 규모라 별도 배치/캐시 없이 즉시 계산으로 충분.
- **API**: `bookings`/`expenses`/`supplies`/`maintenance-issues`에 대한 CRUD(`GET/POST/PUT/DELETE /api/dashboard/{resource}`), `GET /api/dashboard/summary?month=YYYY-MM`(점유율·순이익·ADR·노쇼율), `GET /api/dashboard/rooms/{id}/supplies`(재고 부족 항목 포함)
- **프런트엔드**: 별도 라우트 `/dashboard`(react-router 도입 필요 — 지금까지는 단일 페이지였으므로 이 대시보드 추가로 라우팅이 처음 필요해짐)
  - 로그인 화면
  - 예약 입력/상태 변경(체크인·노쇼·취소 처리 포함) 폼과 목록
  - 비용 입력 폼 (카테고리에 세탁비 포함)
  - 객실별 비품 재고 화면 (부족 항목 하이라이트)
  - 유지보수 이슈 등록/상태 변경 화면
  - 월별 요약 대시보드: 점유율·순이익·ADR·노쇼율 추이를 차트로(카드형 통계 + 추이 그래프), 최근 입력 내역 리스트
- 이 대시보드에 실제 데이터가 쌓이면, 추후 공개 케이스 스터디의 "숙박업 운영" 챕터 지표를 더미 대신 이 실데이터의 공개-안전한 요약으로 바꿔치기할 수 있도록 API 계약을 설계해둔다(1차 구현 범위는 아님, 확장 여지만 남김).

### 동시성 제어 (좁게 스코프)

이 시스템에서 동시성 문제가 실제로 발생할 수 있는 지점은 "같은 날짜에 겹치는 예약이 동시에 두 번 등록되는 것"(더블클릭, 여러 탭 등) 하나뿐이다 — 여기에만 정확히 대응하고, 그 외에는 과잉설계하지 않는다.

- **DB 레벨 방어**: `Booking` 테이블에 PostgreSQL **EXCLUDE 제약조건**(`btree_gist` 확장 필요: `EXCLUDE USING gist (room_id WITH =, daterange(start_date, end_date, '[)') WITH &&)`)을 걸어, **같은 객실**에서 날짜 범위가 겹치는 두 행이 동시에 커밋되는 것 자체를 DB가 차단하게 한다 (객실이 다르면 겹쳐도 정상이므로 room_id를 조건에 포함). **주의**: 범위를 `'[)'`(체크인 포함, 체크아웃 미포함) 반개구간으로 둬야 한다 — `'[]'`(양끝 포함)로 하면 오늘 체크아웃하고 오늘 새 손님이 체크인하는, 실제 숙박업에서 흔한 "당일 턴오버"가 시스템상 겹침으로 잘못 차단된다.
- **애플리케이션 레벨**: 이 제약 위반(`DataIntegrityViolationException`)을 잡아 `409 Conflict` + 사용자 친화적 메시지로 변환하는 예외 핸들러 추가.
- **낙관적 락**: `Booking`/`Expense` 엔티티에 `@Version` 필드를 추가해, 동시 수정/삭제 시 유실 업데이트 없이 충돌을 감지한다.
- **검증**: 겹치는 날짜로 두 예약 생성 요청을 동시에 보내 정확히 하나만 성공하고 다른 하나는 409를 받는 통합 테스트를 작성한다.
- **의도적으로 하지 않는 것**: 분산 락(Redis/Redisson), 메시지 큐, 비관적 락(`SELECT FOR UPDATE`) — 단일 인스턴스·단일 운영자 규모에서 실제 필요가 없는 과잉설계이므로 제외.

## 파일 구조

```
frontend/src/
  sections/{Hero,Intro,Closing,ContactForm}.tsx
  sections/chapters/{ConstructionChapter,InteriorChapter,BridgeSection,OperationsChapter}.tsx
  components/{ScrollReveal,Lightbox,StatCard}.tsx
  hooks/{useInView,useScrollProgress}.ts
  content/{types.ts, caseStudy.ts}   // caseStudy.ts: /api/case-study fetch, 개발 중 로컬 JSON 폴백
  lib/api.ts
  dashboard/
    LoginPage.tsx, DashboardLayout.tsx
    BookingsPage.tsx, ExpensesPage.tsx, SummaryPage.tsx
    hooks/useAuth.ts, lib/dashboardApi.ts
  App.tsx   // react-router: "/" 공개 페이지, "/dashboard/*" 보호된 라우트
  각 컴포넌트/훅 옆에 *.test.tsx / *.test.ts (Vitest) 배치 — 특히 집계/포맷 로직은 컴포넌트에서 분리한 순수 함수로 만들어 단위 테스트

backend/src/main/java/.../portfolio/
  PortfolioApplication.java
  casestudy/{CaseStudyController, CaseStudyService}.java
  inquiry/{Inquiry, InquiryRepository, InquiryController}.java, dto/InquiryRequest.java
  auth/{SecurityConfig, JwtService, AuthController}.java
  dashboard/room/{Room, RoomRepository, RoomController, RoomService}.java
  dashboard/booking/{Booking, BookingRepository, BookingController, BookingService}.java
  dashboard/expense/{Expense, ExpenseRepository, ExpenseController, ExpenseService}.java
  dashboard/supply/{Supply, SupplyRepository, SupplyController, SupplyService}.java
  dashboard/maintenance/{MaintenanceIssue, MaintenanceIssueRepository, MaintenanceIssueController, MaintenanceIssueService}.java
  dashboard/renovation/{RenovationProject, RenovationProjectRepository, RenovationProjectController}.java   // 일부 필드는 GET /api/case-study(공개)에서도 참조
  dashboard/summary/{SummaryController, SummaryService}.java
backend/src/test/java/.../
  각 Service/Controller 단위 테스트 (JUnit 5 + Mockito)
  architecture/ArchitectureTest.java   // ArchUnit: 계층 의존 방향(controller→service→repository), 패키지 순환 참조 금지 등 규칙
backend/src/main/resources/
  content/case-study-ko.json   // 더미 콘텐츠
  application.yml              // PostgreSQL 접속 설정
docker-compose.yml             // 로컬 개발용 PostgreSQL 컨테이너
```

## 개인 도구 활용 (`~/githubs`)

- **`~/githubs/git-format`**: 이 저장소의 `install.sh`로 `.gitmessage` 커밋 템플릿 + `commit-msg` 훅을 이 프로젝트에 설치한다. 모든 커밋은 `[type][subsystem] <description>`(제목 50자 이내, 명령형 현재형) 형식을 따르고, 본문은 "무엇을 왜"만 72자 줄바꿈으로 쓰며, backlog task와 연결하기 위해 footer에 `Task-Id: <ID>` 트레일러를 남긴다.
- **`~/githubs/claude-rails` 훅 전부 적용(필수)**: `~/.claude/settings.json`에 이미 전역으로 걸려 있는 27개 훅(`pre_commit_check`, `pre_push_check`, `pre_push_coverage_check`, `require_active_task`, `protect_tests`, `protect_secrets`, `format_code`, `block_stop_if_dirty`, `pr_provenance_stamp`, `bounty_board` 등)을 이 프로젝트에서도 절대 우회하지 않는다(`--no-verify` 등 금지). 다만 일부 훅은 프로젝트별 설정이 필요해 이 프로젝트 루트에 `.claude-rails.json`을 만든다:
  - `testCommand`: 프런트(`pnpm test`)+백엔드(`./gradlew test`)를 모두 실행하는 `scripts/test-all.sh`를 만들어 등록 — `pre_commit_check`/`pre_push_check`가 이 스크립트로 검증한다.
  - `pre_push_coverage_check`가 커버리지 기준을 검사하므로, 백엔드에 **Jacoco**를 추가해 실제 커버리지 리포트가 나오게 한다(프런트는 Vitest의 커버리지 리포터 사용).
  - `format_code`가 저장 시 자동 포매팅을 하므로, 프런트는 Prettier, 백엔드는 Spotless(google-java-format)를 설정해 두 스택 모두에서 이 훅이 정상 동작하게 한다.
- **`~/githubs/fzf`**: 제품 코드에는 포함하지 않고, 개발 편의 스크립트에만 사용한다 — 예: `scripts/pick-task.sh`에서 `backlog task list --plain | fzf`로 다음 작업할 task를 대화형으로 고르는 짧은 헬퍼.
- **Backlog.md CLI**: 이미 `asdf`로 전역 설치되어 있음(`backlog` v1.51.0 확인됨) — 별도 설치 불필요, 바로 `backlog draft create` 등으로 이 계획을 태스크화한다. (`~/githubs/backlog`는 실제 데이터가 아니라 CLI 사용법을 익히기 위한 연습용 샌드박스라 이 프로젝트와 무관.)
- **`~/githubs/aws-launcher`**: 위 "배포 아키텍처" 섹션 참고 — VPC/EC2/Route53/Secrets Manager/GitHub OIDC 모듈을 재사용해 `live/simple-react-spring-web/`을 구성한다.
- **`~/githubs/container-database`**(선택, 의존성 아님): Postgres EXCLUDE 제약·격리수준별 동시성 동작을 실제로 손으로 실험해보고 싶으면 이 저장소의 `docker compose up -d`로 로컬에 별도로 띄워 연습할 수 있다 — 이 프로젝트의 `docker-compose.yml`과는 독립적인 학습용 샌드박스일 뿐, 프로젝트가 이 저장소에 의존하지는 않는다.
- **인용 규칙 + `~/githubs/Books` 매핑**: 구현 중 아래 책의 내용을 참고했다면 코드 주석이 아니라 README의 "참고 자료" 섹션 또는 관련 커밋 메시지 footer에 `책 제목, p.쪽수 — 참고한 내용 요약` 형태로 정확히 남긴다.
  - JPA/N+1/Hibernate → _자바 퍼시스턴스 프로그래밍 완벽가이드_, _Java Persistence with Spring Data and Hibernate_
  - 동시성 제어(EXCLUDE 제약·낙관적 락) → _java-concurrency.pdf_
  - Java 25 세부 사양 확인 필요시 → _jls25.pdf_, _jvms25.pdf_
  - Spring Boot/Security 설계 → _스프링 교과서_, _Spring Boot - Hibernate 100 questions_
  - 테스트 전략(JUnit5) → _Junit in Action 3rd_
  - 계층 구조·ArchUnit 규칙 근거 → _소프트웨어 아키텍처 The Hard Parts_
  - 코드 품질/커밋 단위 판단 → _이펙티브 자바_, _굿코드배드코드_, _타이디퍼스트_
  - git 사용/커밋 관행 → _Pro Git.pdf_

## 실행 방식 (세션/터미널이 끊겨도 이어지도록)

사용자는 이 작업을 이 디렉토리에 전권 위임하고, 터미널/세션이 종료되거나 토큰·사용량 한도에 걸려도 완료될 때까지 자동으로 이어지길 원한다. 이를 위해 다음 방식으로 진행한다 — 단, **사용량/토큰 한도 자체를 우회할 방법은 없다**는 점은 명확히 한다. 한도에 걸리면 그 시점엔 아무 에이전트도 실행될 수 없고, 한도가 풀리는 다음 주기에 자동으로 이어서 진행되는 것이 현실적으로 가능한 최선이다.

1. **진행 상태의 영속화**: 이 디렉토리를 git 저장소로 초기화하고, 이 기획안을 **Backlog.md CLI**(이미 전역 설치됨, v1.51.0)로 사용자의 글로벌 backlog.md 워크플로(`~/.claude/CLAUDE.md`에 정의된 draft→promote→task)에 따라 전부 task화한다 — 이 계획서의 모든 섹션(공개 페이지, 대시보드 엔티티별, 테스트, CI/CD, Terraform, Virtual Threads 등)이 빠짐없이 backlog task로 만들어져야 한다.
2. **커밋 단위 = 함수 단위(필수)**: AC 하나가 여러 함수/메서드로 이뤄진다면, AC 완료까지 기다리지 않고 **함수(메서드) 하나를 구현할 때마다 커밋**한다 — AC 단위는 backlog task의 완료 기준일 뿐, 실제 커밋 빈도는 그보다 훨씬 잘게 쪼갠다. 각 커밋은 git-format 컨벤션(`[type][subsystem] <description>`, `Task-Id:` 트레일러)을 따르는 하나의 논리적 단위(함수 하나 + 그 함수의 테스트)로 구성한다. 이렇게 잘게 쌓인 커밋 덕분에 크론 에이전트가 세션 중간에 끊겨도 손실되는 작업량이 최소화된다.
3. **터미널과 무관하게 도는 실행 주체**: 로컬 `/loop`는 이 세션/터미널에 묶여 있어 터미널을 닫으면 함께 끊긴다. 터미널·세션 종료에도 살아남으려면 `schedule` 스킬로 **클라우드 크론 에이전트**를 등록해야 한다 — 이 에이전트는 정해진 주기마다 클라우드에서 깨어나 `backlog board view`로 다음 task를 확인하고, 이 계획대로 한 AC만큼 구현→테스트→커밋을 진행한 뒤 종료한다. 다음 주기에 또 깨어나 이어서 진행 — 이 반복이 모든 task가 Done이 될 때까지 계속된다.
4. **전제 조건**: 클라우드 크론 에이전트가 코드에 접근하려면 GitHub 원격 저장소가 필요하다. 사용자는 이미 원격 저장소가 있다고 확인했다 — 실행 단계에서 정확한 URL을 받아 연결한다.
5. **체크인 간격**: 사용자는 Pro 플랜을 사용 중이며 "가능한 한 빨리" 결과물을 받고 싶어 한다. Pro 플랜은 한도가 상대적으로 좁으므로, 너무 짧은 간격(예: 매 몇 분)은 오히려 한도를 순식간에 소모해 중간에 자주 멈추는 역효과를 낼 수 있다. **1시간 간격**으로 시작하고, 실제 한도 소모 패턴을 보며 필요시 조정하는 것을 권장한다.
6. **AWS 인증/배포는 맨 마지막, 수동 승인 후에만**: 크론 에이전트는 프런트/백엔드/대시보드/테스트/CI 워크플로 YAML/Terraform 코드까지 전부 커밋하되, 실제 AWS 인증 정보 연결·`terraform apply`·EC2에 대한 최초 배포는 자동으로 하지 않는다. Terraform 코드는 정적 분석(tflint/checkov/trivy)까지만 CI에서 통과시키고, `apply`는 이 계획의 마지막 task로 남겨 사용자가 직접 "이제 배포해도 된다"고 승인한 뒤에만 진행한다 — 실제 계정에 자원을 만들고 비용이 발생하는 단계라 자동 진행 대상에서 제외.
7. **예상 소요 기간**: 이 계획을 backlog task로 쪼개면 대략 45-60개 정도의 AC 단위 task가 나올 것으로 예상된다(공개 페이지 7섹션+애니메이션 약 10개, 대시보드 6개 엔티티의 CRUD+집계+동시성 약 18개, 테스트/ArchUnit/Testcontainers 약 9개, CI/Dockerfile/README 약 5개, Virtual Threads 심화 약 4개, Terraform 코드 작성 약 4개 — 여기에 "커밋 단위 = 함수 단위" 규칙까지 더하면 실제 커밋 수는 이보다 몇 배 더 많아진다). 1시간 간격 크론이 사이클당 평균 1개 task를 처리한다고 가정하면 산술적으로는 2-3일이지만, Pro 플랜의 사용량 한도(주기적 리셋)에 걸려 스킵되는 사이클이 섞이므로 실제 캘린더 기준으로는 **4-7일 정도**로 보는 게 현실적이다 — 정확한 값은 실제로 돌려보기 전엔 알 수 없다는 점을 감안해달라.

## 배포 아키텍처 (AWS EC2, Terraform — `~/githubs/aws-launcher` 활용)

인프라는 손으로 콘솔에서 만들지 않고, 사용자가 이미 갖고 있는 개인 Terraform 프레임워크 **`~/githubs/aws-launcher`**(modules→scenarios→live 3단 구조, PR마다 tflint/trivy/checkov/infracost 자동 실행)를 그대로 활용한다.

- **재사용할 모듈**: `modules/vpc`, `modules/ec2`, `modules/route53`, `modules/secrets-manager`, `modules/iam-github-oidc` — 이 조합으로 `live/simple-react-spring-web/` 하나를 새로 구성한다(기존 `scenarios/`에 EC2 단일 인스턴스+Docker Compose에 정확히 맞는 게 없어서, 다른 scenario들처럼 모듈을 직접 조합해 새로 만든다).
  - **참고**: `scenarios/standard-web`은 VPC+ALB+ECS Fargate+RDS+observability로 이미 잘 짜여 있지만, 이건 App Runner처럼 완전관리형 컨테이너 오케스트레이션이라 앞서 "EC2 직접 다루고 싶다"는 결정과 어긋난다 — 그래서 채택하지 않고 모듈을 EC2 중심으로 새로 조합한다. (원한다면 나중에 `standard-web`으로 갈아타는 것도 가능 — 그때는 이 판단을 다시 여쭤봄)
- **인스턴스**: `modules/ec2`로 `t3.micro`(프리티어) 1대 생성, Docker + Docker Compose는 EC2의 user-data(cloud-init)로 부팅 시 자동 설치.
- **구성**: 같은 인스턴스 위에서 `docker-compose.prod.yml`로 (1) Spring Boot 앱 컨테이너(프런트 정적 리소스 포함 단일 jar), (2) PostgreSQL 컨테이너, (3) Nginx 컨테이너(리버스 프록시 + Let's Encrypt/certbot으로 TLS)를 함께 기동.
- **도메인/시크릿**: `modules/route53`로 도메인 A레코드를 EC2 Elastic IP로 연결, `modules/secrets-manager`로 DB 비밀번호·JWT 시크릿을 저장하고 배포 시 EC2가 읽어가게 한다(코드/이미지에 시크릿을 굽지 않는다).
- **배포 방식**: GitHub Actions가 **`modules/iam-github-oidc`**로 발급되는 OIDC 역할을 통해 (장기 액세스 키 없이) AWS에 인증 → 이미지를 빌드해 ECR에 푸시 → `appleboy/ssh-action` 등으로 EC2에 SSH 접속해 `docker compose pull && docker compose up -d` 실행.
- **인프라 변경도 PR로 리뷰됨**: `live/simple-react-spring-web/`의 Terraform 변경은 aws-launcher의 기존 CI(tflint→trivy/checkov→conftest→plan+infracost 비용 예측)를 그대로 통과해야 머지된다 — `apply`는 자동화하지 않고 수동 확인 후 실행.

## README / 기술 문서

실무 수준의 엔지니어링 문서화 관행에 따라 저장소 루트에 `README.md`를 작성한다: 프로젝트 한 줄 소개, 라이브 데모 링크, 아키텍처 다이어그램(프런트/백엔드/DB/AWS 구성), 주요 기술 선택 이유(왜 PostgreSQL·JWT·EC2·ArchUnit인지), 테스트 전략, 스크린샷(공개 페이지 + 대시보드). 코드만으로 드러나지 않는 "판단 과정"을 문서화해 AI가 코드를 생성했더라도 본인이 의사결정하고 검증했다는 근거를 남긴다.

## CI/CD (GitHub Actions)

- **PR 검증 파이프라인**: PR이 열리면 프런트(`pnpm lint`, `pnpm test`, `pnpm build`)와 백엔드(`./gradlew test` — 여기에 유닛 테스트와 ArchUnit 아키텍처 테스트가 함께 포함되어 실행됨) 를 각각 실행해 통과해야 머지 가능하도록 브랜치 보호 규칙과 연동.
- **배포 파이프라인**: `main` 브랜치 푸시 시 `iam-github-oidc`로 발급된 역할로 AWS 인증(장기 액세스 키 미사용) → Docker 이미지 빌드 → ECR 푸시 → EC2에 SSH 접속해 `docker compose pull && docker compose up -d` 실행. 크론 에이전트가 AC 단위로 커밋을 쌓는 동안에도 매 머지마다 이 파이프라인이 자동으로 검증/배포를 수행하므로, 배포 가능한 상태가 항상 유지된다.
- **인프라 변경 파이프라인**: `live/simple-react-spring-web/`의 Terraform 변경은 aws-launcher 저장소의 기존 PR 파이프라인(tflint/trivy/checkov/conftest/infracost)을 통과해야 한다.

## 추가 기술적 도전과제 (의도적으로 다루는 것들)

- **Postgres 전용 기능이라 H2로 테스트 불가**: EXCLUDE 제약조건, `daterange`, `btree_gist`는 Postgres 전용 기능이라 인메모리 H2로는 재현이 안 된다 — 백엔드 통합 테스트(특히 동시성 테스트)는 **Testcontainers**로 실제 Postgres 컨테이너를 띄워 검증한다. GitHub Actions(Ubuntu 러너)는 Docker-in-Docker가 기본 지원되어 Testcontainers가 CI에서도 그대로 동작한다.
- **N+1 쿼리 문제**: `Room`에 딸린 `Booking`/`Expense`/`Supply`/`MaintenanceIssue`를 목록/요약 조회할 때 지연 로딩을 그대로 두면 N+1이 발생한다 — 요약/목록 조회 리포지토리 메서드에 `JOIN FETCH`(또는 `@EntityGraph`)를 명시하고, 테스트에서 Hibernate 통계(`Statistics.getQueryExecutionCount()`)로 쿼리 수가 고정 범위 안에 있는지 검증하는 테스트를 하나 추가한다.
- **이미지 저장은 DB가 아니라 S3로**: 리모델링 전/후 사진, 완공 갤러리 이미지는 바이너리를 DB에 넣지 않고 **Amazon S3**에 저장한다 — 백엔드가 presigned URL을 발급하면 프런트가 S3에 직접 업로드하고, 조회는 S3 URL(또는 CloudFront)로 서빙하는 방식.
- **결제/PG 연동은 의도적으로 범위 제외**: 노쇼 위약금을 실제로 자동 청구하려면 결제대행사(PG) 연동(토스페이먼츠 등)이 필요한데, 이건 사업자 계약과 웹훅 멱등성 처리 등 별도의 큰 과제라 이번 범위에서 제외한다 — 노쇼는 `Booking.status`로 기록만 하고, 위약금은 운영자가 `Expense`/메모로 수동 기록하는 것으로 정직하게 남긴다.
- **감사 필드(최소 수준)**: 예약/비용처럼 금액이 걸린 데이터는 Spring Data JPA Auditing으로 `createdAt`/`updatedAt`만 자동 기록한다 — 단일 운영자 시스템이라 전체 변경 이력(Envers 등)까지는 과함, 최소한의 "언제 기록됐나"만 남긴다.
- **무중단 배포는 하지 않음(의도적 트레이드오프)**: 단일 EC2 인스턴스 구조라 배포 시 컨테이너 재기동으로 짧은 다운타임이 발생한다 — 트래픽 규모상 로드밸런서+다중 인스턴스의 블루/그린 배포는 과잉이라 판단해 이 한계를 그대로 문서화(README)하고 넘어간다.
- **기본 헬스체크만**: Spring Boot Actuator의 `/actuator/health`만 노출해 배포 후 정상 기동 확인용으로 쓴다 — Grafana/Prometheus 같은 풀 옵저버빌리티 스택은 이 규모에 과함.
- **환경 분리 및 시크릿**: `application-dev.yml`/`application-prod.yml` 프로파일로 로컬/운영 설정 분리, DB 비밀번호·JWT 시크릿·AWS 키는 GitHub Actions repo secrets에 저장했다가 배포 스텝에서 EC2의 `.env`로 주입 — 코드/이미지에 시크릿을 굽지 않는다.

## 심화 기술 과제: 가상 스레드 (Virtual Threads)

단순히 `spring.threads.virtual.enabled=true` 플래그만 켜고 끝내면 "유행이라 넣어봤다" 수준에 머문다 — 대신 **왜 도움이 되고 어디까지 도움이 되는지 직접 측정하고, 흔한 함정을 실제로 확인**하는 과정까지 포함해 깊이를 만든다.

- **적용**: 대시보드 API(Tomcat 요청 처리 스레드)에 가상 스레드 적용. HikariCP 커넥션 풀 크기는 그대로 작게 유지 — 가상 스레드는 "대기 중인 요청 수"의 한계를 없애줄 뿐, JDBC 호출 자체는 여전히 커넥션을 점유하는 블로킹 호출이라 실제 처리량은 결국 DB 커넥션 풀 크기에 수렴한다는 점을 README에 명확히 설명한다 (가상 스레드를 "DB 쿼리 자체가 빨라진다"로 오해하지 않도록).
- **핀닝(pinning) 문제 확인**: 가상 스레드가 `synchronized` 블록 안에서 블로킹 I/O를 만나면 캐리어(플랫폼) 스레드에 "고정"되어 가상 스레드의 이점이 사라진다 — `-Djdk.tracePinnedThreads=full` 옵션으로 로컬에서 실제 핀닝 이벤트가 발생하는지 확인하고(Spring Security 필터 체인이나 로깅 라이브러리 내부의 `synchronized` 사용이 흔한 원인), 발견되면 `ReentrantLock`으로 대체하거나 회피한다.
- **벤치마크**: 의도적으로 I/O가 여러 번 순차적으로 걸리는 엔드포인트(`GET /api/dashboard/summary` — Room/Booking/Expense를 순차 조회 후 집계)를 대상으로, **k6**로 동시 요청을 늘려가며 `virtual threads OFF(기존 플랫폼 스레드) vs ON`의 처리량(RPS)·지연시간(p95/p99)을 비교 측정한다.
- **결과 문서화**: 동시성이 낮을 땐 차이가 미미하고, 동시 요청 수가 많아질수록(특히 스레드 풀 한계에 부딪히는 구간) 가상 스레드 쪽이 안정적으로 응답한다는 것을 그래프와 함께 README에 정리 — "언제 유효한 최적화인지"를 스스로 판단할 수 있다는 근거가 된다.
- **범위**: 이건 MVP 기능이 아니라 별도 심화 task로 분리 — 나머지 기능이 먼저 안정화된 뒤에 진행한다.

## 기술적 리스크 / 주의사항

- **OTA(야놀자/여기어때) API 연동 불가**: 개인 호스트가 자유롭게 호출 가능한 공개 API가 없다 — 실 예약 데이터 자동 수집은 채널매니저 파트너 계약이 필요한 B2B 영역이라 이 프로젝트 범위에서 불가능. 예약/비용은 계획대로 **수동 입력**으로 가고, README에 "향후 채널매니저 연동 확장 가능"이라고 로드맵으로만 언급.
- **Java 25 + Spring Boot 호환성**: Java 25는 매우 최신 LTS라 Spring Boot가 시점에 따라 공식 지원하지 않을 수 있음. 초기 세팅 단계에서 실제로 빌드/구동이 안 되면 Java 21 LTS로 낮추는 것을 대안으로 둔다.
- **ArchUnit + 최신 Java 바이트코드**: ArchUnit은 내부적으로 ASM으로 바이트코드를 분석하는데, 매우 최신 Java 버전은 최신 ArchUnit/ASM 버전이 아니면 파싱 오류가 날 수 있음 — 의존성 버전을 최신으로 맞출 것.
- **jsdom에 IntersectionObserver 없음**: 스크롤 스토리텔링의 핵심인 `useInView` 훅은 IntersectionObserver를 쓰는데, Vitest 기본 환경(jsdom)엔 이게 구현되어 있지 않다 — 테스트 셋업 파일에 폴리필/모킹을 추가해야 관련 컴포넌트 테스트가 통과한다.
- **JWT 저장 위치**: localStorage에 저장하면 XSS에 취약하다 — httpOnly 쿠키 방식을 우선 검토하고, 어렵다면 최소한 XSS 방지(입력값 이스케이프, CSP 헤더)를 병행한다.
- **EC2 위 PostgreSQL 데이터 영속성/백업**: RDS와 달리 자동 백업이 없다 — EBS 볼륨에 데이터를 두고, `pg_dump`를 주기적으로 S3에 백업하는 간단한 크론을 추가로 구성해야 인스턴스 교체 시 데이터 유실을 막을 수 있다.
- **도메인/TLS**: Let's Encrypt(certbot)로 HTTPS를 걸려면 EC2의 고정 IP(Elastic IP)를 가리키는 실제 도메인이 필요하다 — 보유한 도메인이 있는지, 없다면 어디서 구매/연결할지 확인이 필요함 (아직 미확인 — 실행 단계에서 확인).
- **컨테이너 자동 재시작**: `docker-compose.prod.yml`의 각 서비스에 `restart: always`를 설정하고 Docker 데몬을 systemd로 부팅 시 자동 기동하게 해야, 인스턴스 재부팅/컨테이너 크래시 시 수동 개입 없이 복구된다.
- **스톡 이미지 라이선스**: 더미 사진은 실제 공개 배포되는 사이트에 들어가므로, 라이선스가 명확한 무료 소스(Unsplash/Pexels 등)만 사용해야 한다.
- **GitHub 저장소 URL 미확보**: 크론 에이전트 연결을 위해 실행 단계 진입 전 정확한 저장소 URL을 받아야 한다.

## 검증 방법

- 프런트엔드: `pnpm test`(Vitest, 컴포넌트+집계 로직 단위 테스트)와 `pnpm dev`로 로컬 구동 후 전체 스크롤 서사가 의도한 순서/애니메이션으로 재생되는지, 반응형(모바일 폭 포함)에서 레이아웃이 깨지지 않는지 브라우저로 직접 확인. `/dashboard`는 로그인→예약/비용 입력→월별 요약 반영까지 실제 브라우저로 시나리오 확인.
- 백엔드: `./gradlew test`(유닛 테스트 + ArchUnit 아키텍처 규칙 검증) 통과 확인, `docker compose up -d`로 로컬 PostgreSQL 기동 후 `./gradlew bootRun`, `curl localhost:8080/api/case-study`로 더미 콘텐츠 응답 확인, `POST /api/inquiries`로 문의 저장 후 `psql`로 데이터 확인, 로그인 후 예약/비용 CRUD와 `GET /api/dashboard/summary`가 올바르게 집계되는지 확인
- 통합: Vite 프록시로 프런트 개발 서버에서 실제 API 연동 확인, 최종적으로 `frontend/dist`를 백엔드 static 리소스에 넣고 단일 jar로 빌드해 `localhost:8080`에서 전체 페이지 확인
- 동시성: 겹치는 날짜의 예약 생성 요청 두 개를 동시에 보내 정확히 하나만 성공(409 응답 하나)하는지 통합 테스트로 확인
- CI: GitHub Actions PR 파이프라인이 프런트/백엔드 테스트를 모두 통과시키는지 실제 PR로 확인
