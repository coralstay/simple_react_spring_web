# plan-v2 — aws-launcher 미사용, 직접 Terraform 구현으로 변경

이전 버전: [plan-v1.md](./plan-v1.md) (변경하지 않음, 그대로 보존)

## 변경 사항

**변경 전(v1)**: AWS 인프라는 `~/githubs/aws-launcher`의 기존 모듈(`vpc`, `ec2`, `route53`,
`secrets-manager`, `iam-github-oidc`)을 재사용해 그 저장소의 `live/simple-react-spring-web/`에
구성하고, 그 저장소의 기존 PR 파이프라인(tflint/trivy/checkov/infracost)을 통해 검증한다.

**변경 후(v2)**: aws-launcher를 사용하지 않는다. **이 저장소 안에 `infra/` 디렉토리를 만들어
Terraform 코드를 직접 작성**한다. 외부 저장소의 모듈을 재사용하지 않고, EC2 단일 인스턴스 배포에
필요한 리소스(보안그룹, EC2, Route53, Secrets Manager, GitHub OIDC용 IAM)를 이 프로젝트 안에서
직접 정의한다. 별도 VPC는 만들지 않고 기본 VPC를 사용해 과잉설계를 피한다.

검증은 aws-launcher의 외부 CI에 의존하지 않고, 이 저장소의 GitHub Actions에 `terraform fmt -check`
+ `terraform validate`를 추가하는 자체 워크플로로 대체한다.

## 영향받는 범위

- "배포 아키텍처 (AWS EC2, Terraform — aws-launcher 활용)" 섹션 전체 — aws-launcher 참조를 제거하고
  `infra/`가 이 저장소 안에 있는 것으로 대체
- "CI/CD" 섹션의 "인프라 변경 파이프라인" 항목 — aws-launcher 저장소의 CI 대신 이 저장소 자체
  Terraform 워크플로로 대체
- "개인 도구 활용" 섹션의 `~/githubs/aws-launcher` 항목 — 더 이상 사용하지 않음
- backlog TASK-48 — 제목/설명 변경, 파일 경로를 `infra/` 하위로 변경, 리프 서브태스크 추가

나머지(콘텐츠, 대시보드, 동시성 제어, 테스트 전략, Virtual Threads 심화 등)는 v1 그대로 유효하다.
