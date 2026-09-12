package com.portfolio.inquiry;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@link Inquiry} 엔티티에 대한 기본 CRUD를 제공하는 Spring Data JPA 리포지토리.
 */
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
}
