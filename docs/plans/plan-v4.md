# plan-v4 — 마일스톤 리뷰 내용을 backlog doc으로 파일 기록

이전 버전: plan-v1.md, plan-v2.md, plan-v3.md (모두 변경하지 않음)

## 변경 사항(불변식에 추가)

마일스톤 리뷰(plan-v3 참고)를 받은 뒤, 그 리뷰 내용 자체를 **반드시 backlog.md CLI로 파일에
기록**한다. 구두/채팅으로만 남기고 넘어가지 않는다.

절차:
1. `simple-web-aplication-reviewer` 세션에서 리뷰 피드백을 받는다.
2. `backlog doc create "M<N> 리뷰 결과" -p reviews -t specification` 로 문서를 만든다.
3. `backlog doc update <docId> --content "<리뷰 원문 + 조치 내역>"` 로 실제 리뷰 내용과, 그에
   대해 무엇을 어떻게 수정했는지를 함께 채워 넣는다.
4. 해당 마일스톤에 속한 task들에 `backlog task edit TASK-N --doc <docId 또는 경로>` 로 리뷰
   문서를 연결해, 나중에 `task view`만으로 그 task가 어떤 리뷰를 거쳤는지 바로 보이게 한다.
5. Backlog 마크다운 파일(doc/task/decision/milestone)은 항상 CLI로만 쓰고 직접 편집하지 않는다.

## 영향받는 범위

- "실행 방식" 섹션에 리뷰 기록 절차가 추가됨(마일스톤 완료 → 리뷰 요청 → **리뷰 doc 기록** →
  반영 → 다음 마일스톤)
