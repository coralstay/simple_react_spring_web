# plan-v16 — /clear 타이밍 가이드라인

이전 버전: plan-v1~v15.md (모두 변경하지 않음)

## 배경

이 프로젝트의 모든 중요한 판단(리뷰/검증 결과, 프로세스 규칙, 사고 원인)은 이미
git 커밋·backlog task·docs/plans/plan-v*.md·backlog doc으로 파일에 영속화된다
(plan-v1~v15 전반의 설계 원칙). 그래서 대화 세션 자체의 메모리가 사라져도
실제로 잃는 정보가 거의 없다 — `/clear`를 언제 써도 되는지에 대한 실용적
가이드라인을 정리한다.

## 가이드라인

**좋은 타이밍**: 어떤 라운드(리뷰/검증/조사)의 결론이 이미 doc/plan/backlog에
파일로 남은 직후. 구체적으로는:
- **implementer(오케스트레이터)가 reviewer/verify에게 다음 리뷰·검증을 새로
  요청하는 시점** — 그 요청이 온다는 것 자체가 "직전 라운드는 이미 doc으로
  마무리됐다"는 신호이므로, reviewer/verify는 이 시점에 이전 대화 컨텍스트를
  비워도 안전하다.
- 마일스톤 게이트가 reviewer+verify 양쪽 PASS로 완전히 닫힌 직후.

**피해야 할 타이밍**: 조사/디버깅이 진행 중이라 아직 결론이 doc/notes에 안
적힌 상태. 이때 클리어하면 externalize 안 된 판단 과정이 사라진다.

**세션별 적용**:
- reviewer / verify / logger: 자기 몫의 라운드가 doc으로 마무리될 때마다 클리어
  가능. implementer로부터 새 요청이 오는 시점이 실질적인 트리거.
- implementer(오케스트레이터): 마일스톤 하나가 완전히 닫히는 큰 매듭에서 사용자가
  판단해 클리어. `/clear`는 세션이 스스로 호출하는 도구가 없어(plan-v7 참고)
  사용자가 직접 실행해야 한다.

## 영향받는 범위
- reviewer, verify, logger 세션에 공지
