package com.portfolio.dashboard.room;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
 * 운영 대시보드의 객실/유닛 단위를 나타내는 JPA 엔티티.
 *
 * <p>객실이 하나뿐인 숙소라도 이 구조로 두면 이후 객실이 늘어도 그대로 확장된다.
 * {@code renovatedYear}는 아직 리모델링을 하지 않은 객실에서는 null일 수 있으며,
 * 값이 있으면 대시보드에서 "리모델링 후 N년 경과" 형태로 노후도를 드러내는 데 쓰인다.
 */
@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 객실/유닛 이름. */
    @Column(nullable = false)
    private String name;

    /** 최대 수용 인원. */
    @Column(nullable = false)
    private Integer capacity;

    /** 준공 연도. */
    @Column(nullable = false)
    private Integer builtYear;

    /** 가장 최근 리모델링 연도(아직 리모델링 이력이 없으면 null). */
    private Integer renovatedYear;
}
