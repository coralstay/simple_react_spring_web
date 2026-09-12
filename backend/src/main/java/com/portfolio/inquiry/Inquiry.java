package com.portfolio.inquiry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 공개 문의/예약 문의 폼({@code POST /api/inquiries}) 제출을 저장하는 JPA 엔티티.
 *
 * <p>{@code POST /api/inquiries}는 인증이 필요 없는 공개 엔드포인트이므로(SecurityConfig 참고),
 * 이 엔티티에는 작성자(owner)나 인증 관련 필드가 없다 — 누구나 제출할 수 있는 단순 리드(lead)
 * 데이터다. 생성/수정 시각 감사 필드(createdAt/updatedAt)는 JPA Auditing 도입 task(TASK-28)에서
 * 추가될 예정이라 이 엔티티에는 의도적으로 포함하지 않는다.
 */
@Entity
@Table(name = "inquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 문의자 이름. */
    @Column(nullable = false)
    private String name;

    /** 문의자 연락처(전화번호 또는 이메일). */
    @Column(nullable = false)
    private String contact;

    /** 문의 내용. */
    @Column(nullable = false, length = 2000)
    private String message;

    /** 문의 유형(예약 문의 / 일반 문의 / 기타). */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InquiryType type;

    /** 문의 폼에서 선택하는 "문의 유형" 값. */
    public enum InquiryType {
        RESERVATION,
        GENERAL,
        OTHER
    }
}
