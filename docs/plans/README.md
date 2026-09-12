# 기획 문서 버전 관리 규칙

- `plan-v1.md`는 최초 승인된 기획 문서(불변식 포함)다. **이후 절대 직접 수정하지 않는다.**
- 계획에 변경이 필요하면 새 파일 `plan-v2.md`, `plan-v3.md`, ... 를 추가하고, 각 파일 맨 위에 이전 버전 대비 무엇이 왜 바뀌었는지 요약을 남긴다.
- 어떤 버전이 "현재 유효한 계획"인지는 이 README에서 아래 표로 추적한다.

| 버전 | 파일 | 상태 | 비고 |
|------|------|------|------|
| v1 | plan-v1.md | 유효(기반) | 최초 승인본(불변식 포함) |
| v2 | plan-v2.md | 유효(델타) | 배포: aws-launcher 미사용 → 이 저장소 `infra/`에 직접 Terraform 구현 |
| v3 | plan-v3.md | 유효(델타) | 마일스톤 단위로 simple-web-aplication-reviewer 세션 리뷰 게이트 추가 |
| v4 | plan-v4.md | 유효(델타) | 마일스톤 리뷰 내용을 backlog doc으로 파일 기록하는 규칙 추가 |
| v5 | plan-v5.md | 유효(델타) | 다음 마일스톤 전 simple-web-application-verify 피드백도 필수 게이트로 추가 |
| v6 | plan-v6.md | 유효(델타) | 머지는 사용자가 직접(스쿼시 금지) + task Done 커밋에 토큰 사용량 기록 |
| v7 | plan-v7.md | 유효(델타) | recap을 backlog doc(doc-3)에 기록, /clear·프롬프트캐싱 정책 명확화 |
| v8 | plan-v8.md | 유효(델타) | leaf task 구현 전 부모 task+마일스톤(상위 2뎁스) 필수 확인 |
| v9 | plan-v9.md | 유효(델타) | reviewer M1 코드리뷰(doc-4) 반영: SecurityConfig 선행, jsdom 설정, taskPrefix 스크립트화 |
| v10 | plan-v10.md | 유효(델타) | 마일스톤 전환: 직전 리뷰 PASS 확인되면 자동 진행, 아니면 대기 |
| v11 | plan-v11.md | 유효(델타) | backlog --doc은 append가 아니라 set — 항상 기존 링크 포함해서 호출 (필수) |
| v12 | plan-v12.md | 유효(델타) | 상태 인용 시 브랜치/ref만이 아니라 전체 커밋 해시도 필수 기록. 이미 머지된 PR에 추가 push해도 main엔 반영 안 됨 |
| v13 | plan-v13.md | 유효(델타) | 모든 작업 전 git fetch+pull 및 PR 머지여부 확인 필수 |
| 버전 | 파일        | 상태       | 비고                                                                                                            |
| ---- | ----------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| v1   | plan-v1.md  | 유효(기반) | 최초 승인본(불변식 포함)                                                                                        |
| v2   | plan-v2.md  | 유효(델타) | 배포: aws-launcher 미사용 → 이 저장소 `infra/`에 직접 Terraform 구현                                            |
| v3   | plan-v3.md  | 유효(델타) | 마일스톤 단위로 simple-web-aplication-reviewer 세션 리뷰 게이트 추가                                            |
| v4   | plan-v4.md  | 유효(델타) | 마일스톤 리뷰 내용을 backlog doc으로 파일 기록하는 규칙 추가                                                    |
| v5   | plan-v5.md  | 유효(델타) | 다음 마일스톤 전 simple-web-application-verify 피드백도 필수 게이트로 추가                                      |
| v6   | plan-v6.md  | 유효(델타) | 머지는 사용자가 직접(스쿼시 금지) + task Done 커밋에 토큰 사용량 기록                                           |
| v7   | plan-v7.md  | 유효(델타) | recap을 backlog doc(doc-3)에 기록, /clear·프롬프트캐싱 정책 명확화                                              |
| v8   | plan-v8.md  | 유효(델타) | leaf task 구현 전 부모 task+마일스톤(상위 2뎁스) 필수 확인                                                      |
| v9   | plan-v9.md  | 유효(델타) | reviewer M1 코드리뷰(doc-4) 반영: SecurityConfig 선행, jsdom 설정, taskPrefix 스크립트화                        |
| v10  | plan-v10.md | 유효(델타) | 마일스톤 전환: 직전 리뷰 PASS 확인되면 자동 진행, 아니면 대기                                                   |
| v11  | plan-v11.md | 유효(델타) | backlog --doc은 append가 아니라 set — 항상 기존 링크 포함해서 호출 (필수)                                       |
| v12  | plan-v12.md | 유효(델타) | 상태 인용 시 브랜치/ref만이 아니라 전체 커밋 해시도 필수 기록. 이미 머지된 PR에 추가 push해도 main엔 반영 안 됨 |
| v13  | plan-v13.md | 유효(델타) | 모든 작업 전 git fetch+pull 및 PR 머지여부 확인 필수                                                            |
| v14  | plan-v14.md | 유효(델타) | updated_date 역행 사고 원인/재발방지: 충돌 해결 시 완성도 비교 필수                                             |
