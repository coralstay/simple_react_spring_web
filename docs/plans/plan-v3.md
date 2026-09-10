# plan-v3 — 마일스톤 단위 외부 리뷰 워크플로 추가

이전 버전: [plan-v1.md](./plan-v1.md), [plan-v2.md](./plan-v2.md) (둘 다 변경하지 않음)

## 변경 사항

Backlog.md의 50개 task를 7개 마일스톤으로 묶었다:

| ID | 마일스톤 | 범위 |
|----|----------|------|
| m-0 | M1 초기 설정 | TASK-1~4 |
| m-1 | M2 공개 케이스 스터디 페이지 | TASK-5~14 |
| m-2 | M3 운영 대시보드 | TASK-15~29 |
| m-3 | M4 테스트 및 품질 | TASK-30~38 |
| m-4 | M5 CI/CD 및 문서 | TASK-39~43 |
| m-5 | M6 Virtual Threads 심화 | TASK-44~47 |
| m-6 | M7 인프라(Terraform/배포) | TASK-48~50 |

**규칙(불변식에 추가)**: 마일스톤 하나가 전부 Done이 되면, 곧바로 다음 마일스톤 구현에 들어가지
않는다. 이 세션이 별도 세션 `simple-web-aplication-reviewer`에게 SendMessage로 리뷰를 요청하고,
돌아온 피드백을 반영(필요한 leaf task를 새로 만들거나 기존 커밋을 수정)한 뒤에야 다음 마일스톤으로
넘어간다.

## 영향받는 범위

- "실행 방식" 섹션에 마일스톤 경계마다 외부 리뷰 게이트가 추가됨
- backlog: milestone m-0~m-6 생성 및 전체 task에 마일스톤 배정 완료
