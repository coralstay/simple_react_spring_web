package com.portfolio.inquiry;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * {@code POST /api/inquiries} — 공개 문의/예약 문의 폼 제출을 저장하는 컨트롤러.
 *
 * <p>이 엔드포인트는 인증이 필요 없는 공개 엔드포인트다(SecurityConfig의 TASK-15.1에서
 * {@code POST /api/inquiries}를 명시적으로 permitAll로 열어둠). 로그인 없이 누구나 호출할 수
 * 있으므로, 요청 바디를 그대로 저장하지 않고 폼 입력에 해당하는 필드({@code name}, {@code
 * contact}, {@code message}, {@code type})만 뽑아 새 {@link Inquiry}를 만들어 저장한다.
 * 요청 바디에 {@code id}가 함께 실려 와도 무시되므로, 임의의 id를 지정해 기존에 저장된 다른
 * 문의를 덮어쓰는(update로 처리되는) 상황을 방지한다.
 *
 * <p>입력값 검증(필수 필드 누락 등)은 이 task의 AC 범위(단순 POST 매핑) 밖이라 다루지 않는다 —
 * 필요해지면 별도 task에서 {@code @Valid}와 {@link Inquiry}의 Bean Validation 애너테이션을
 * 추가하면 된다.
 */
@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryRepository inquiryRepository;

    public InquiryController(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<Inquiry> submit(@RequestBody Inquiry request) {
        Inquiry inquiry =
                Inquiry.builder()
                        .name(request.getName())
                        .contact(request.getContact())
                        .message(request.getMessage())
                        .type(request.getType())
                        .build();
        Inquiry saved = inquiryRepository.save(inquiry);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
