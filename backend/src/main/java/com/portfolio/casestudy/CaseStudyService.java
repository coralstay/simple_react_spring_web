package com.portfolio.casestudy;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * {@code content/case-study-ko.json} 리소스를 읽어 공개 케이스 스터디 콘텐츠를 제공하는 서비스.
 *
 * <p>이 콘텐츠는 plan-v1.md의 "콘텐츠 데이터 모델"에 정의된 구조({@code frontend/src/content/types.ts}의
 * {@code CaseStudy} 타입과 1:1 대응)를 그대로 담은 정적 더미 데이터이며, DB 테이블 없이 git으로
 * 버전관리되는 단일 JSON 파일이다. 이 서비스는 그 JSON을 파싱해 그대로 돌려주는 얇은 통로 역할만
 * 하므로, 타입 트리 전체를 그대로 미러링하는 다수의 record/DTO 클래스를 새로 만들지 않고
 * {@link JsonNode}로 그대로 노출한다 — {@code CaseStudyController}(TASK-6.1)가 이를 그대로
 * 직렬화해 반환하면 JSON 구조가 손실 없이 그대로 전달된다.
 *
 * <p>리소스는 애플리케이션 시작 시 한 번만 읽어 메모리에 캐시한다. 콘텐츠가 요청마다 바뀌지 않는
 * 정적 파일이므로 매 요청마다 클래스패스에서 다시 읽고 파싱할 이유가 없고, 파일이 손상돼 있다면
 * 요청이 들어왔을 때가 아니라 기동 시점에 바로 실패(fail-fast)하는 편이 문제를 더 빨리 드러낸다.
 */
@Service
public class CaseStudyService {

    private static final String RESOURCE_PATH = "content/case-study-ko.json";

    private final JsonNode caseStudy;

    public CaseStudyService(ObjectMapper objectMapper) {
        this.caseStudy = readCaseStudy(objectMapper);
    }

    private static JsonNode readCaseStudy(ObjectMapper objectMapper) {
        try (InputStream in = new ClassPathResource(RESOURCE_PATH).getInputStream()) {
            return objectMapper.readTree(in);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException(RESOURCE_PATH + " 파싱에 실패했습니다.", e);
        } catch (IOException e) {
            throw new IllegalStateException(RESOURCE_PATH + " 리소스를 읽을 수 없습니다.", e);
        }
    }

    /**
     * 공개 케이스 스터디 콘텐츠를 반환한다.
     *
     * @return {@code case-study-ko.json}을 그대로 파싱한 {@link JsonNode}
     */
    public JsonNode getCaseStudy() {
        return caseStudy;
    }
}
