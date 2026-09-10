# plan-v5 — 다음 마일스톤 진행 전 simple-web-application-verify 피드백도 필수

이전 버전: plan-v1~v4.md (모두 변경하지 않음)

## 변경 사항(불변식에 추가)

plan-v3에서 정한 "마일스톤 완료 → simple-web-aplication-reviewer 리뷰 → 반영 → 다음
마일스톤"에 검증 게이트를 하나 더 추가한다.

**다음 마일스톤으로 넘어가기 전에, `simple-web-application-verify` 세션의 피드백도 반드시
받아야 한다.** reviewer(코드 품질/정합성 리뷰)와 verify(별도 검증)는 서로 다른 세션이며 둘 다
독립적인 게이트다 — 어느 한쪽만 통과했다고 다음 마일스톤에 들어가지 않는다.

절차(마일스톤 완료 시):
1. `simple-web-aplication-reviewer`에게 리뷰 요청 → 피드백 반영 → `backlog doc`으로 기록(plan-v4)
2. `simple-web-application-verify`에게도 검증 요청 → 피드백 반영 → 마찬가지로 `backlog doc`으로 기록
3. 두 세션 모두의 피드백을 반영 완료한 뒤에만 다음 마일스톤 착수

## 영향받는 범위

- "실행 방식"/리뷰 워크플로 섹션에 verify 게이트 추가
