package com.portfolio.casestudy;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * {@code GET /api/case-study} — 공개 케이스 스터디 콘텐츠를 반환한다.
 *
 * <p>인증이 필요 없는 공개 엔드포인트다({@code SecurityConfig}에서 permitAll로 열려 있음).
 * {@link CaseStudyService}가 반환하는 {@link JsonNode}를 DTO 변환 없이 그대로 직렬화해
 * {@code content/case-study-ko.json}의 구조를 손실 없이 전달한다.
 */
@RestController
public class CaseStudyController {

    private final CaseStudyService caseStudyService;

    public CaseStudyController(CaseStudyService caseStudyService) {
        this.caseStudyService = caseStudyService;
    }

    @GetMapping(path = "/api/case-study", produces = MediaType.APPLICATION_JSON_VALUE)
    public JsonNode getCaseStudy() {
        return caseStudyService.getCaseStudy();
    }
}
