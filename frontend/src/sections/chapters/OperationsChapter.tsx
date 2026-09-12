import type { CSSProperties } from "react";
import type { OperationsChapter as OperationsChapterContent } from "../../content/types";

export interface OperationsChapterProps {
  chapter: OperationsChapterContent;
}

const sectionStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "clamp(2.5rem, 8vw, 6rem) clamp(1.25rem, 6vw, 4rem)",
};

const headerStyle: CSSProperties = {
  maxWidth: "48rem",
  margin: "0 auto clamp(2rem, 5vw, 3rem)",
  textAlign: "center",
};

const titleStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
  fontWeight: 700,
  color: "#1a1a1a",
};

const narrativeStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1rem, 2vw, 1.125rem)",
  lineHeight: 1.7,
  color: "#3a3a3a",
  wordBreak: "keep-all",
};

const subsectionStyle: CSSProperties = {
  maxWidth: "72rem",
  margin: "0 auto clamp(2.5rem, 6vw, 4rem)",
};

const subsectionHeadingStyle: CSSProperties = {
  margin: "0 0 clamp(1rem, 3vw, 1.5rem)",
  fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
  fontWeight: 700,
  color: "#1a1a1a",
};

const decisionsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
  gap: "clamp(1rem, 3vw, 1.75rem)",
};

const decisionCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.75rem",
  overflow: "hidden",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
};

const decisionImageStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
};

const decisionBodyStyle: CSSProperties = {
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const decisionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.0625rem",
  fontWeight: 600,
  color: "#1a1a1a",
};

const decisionDescriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "#4a4a4a",
  wordBreak: "keep-all",
};

const metricsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
  gap: "clamp(1rem, 3vw, 1.5rem)",
};

const metricCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.375rem",
  padding: "clamp(1.25rem, 3vw, 1.75rem) 1rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
  textAlign: "center",
};

const metricValueRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: "0.25rem",
};

const metricValueStyle: CSSProperties = {
  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
  fontWeight: 700,
  color: "#1a1a1a",
};

const metricUnitStyle: CSSProperties = {
  fontSize: "clamp(0.875rem, 2vw, 1rem)",
  fontWeight: 600,
  color: "#4a4a4a",
};

const metricLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.875rem",
  color: "#6a6a6a",
  wordBreak: "keep-all",
};

const reviewsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
  gap: "clamp(1rem, 3vw, 1.75rem)",
};

const reviewCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1.25rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
};

const reviewQuoteStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "#3a3a3a",
  wordBreak: "keep-all",
};

const reviewMetaStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
};

const reviewRatingStyle: CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#b8860b",
  letterSpacing: "0.05em",
};

const reviewDateStyle: CSSProperties = {
  fontSize: "0.8125rem",
  color: "#8a8a8a",
};

function formatRating(rating: number): string {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  const filled = "★".repeat(rounded);
  const empty = "☆".repeat(5 - rounded);
  return `${filled}${empty} ${rating.toFixed(1)}`;
}

function OperationsChapter({ chapter }: OperationsChapterProps) {
  return (
    <section aria-label={chapter.title} style={sectionStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>{chapter.title}</h2>
        <p style={narrativeStyle}>{chapter.narrative}</p>
      </header>

      <div style={subsectionStyle}>
        <h3 style={subsectionHeadingStyle}>운영 판단</h3>
        <div style={decisionsGridStyle}>
          {chapter.spaceDecisions.map((decision) => (
            <article key={decision.title} style={decisionCardStyle}>
              <img
                src={decision.imageUrl}
                alt={decision.title}
                style={decisionImageStyle}
                loading="lazy"
              />
              <div style={decisionBodyStyle}>
                <h4 style={decisionTitleStyle}>{decision.title}</h4>
                <p style={decisionDescriptionStyle}>{decision.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div style={subsectionStyle}>
        <h3 style={subsectionHeadingStyle}>핵심 지표</h3>
        <div style={metricsGridStyle}>
          {chapter.metrics.map((metric) => (
            <div key={metric.label} style={metricCardStyle}>
              <div style={metricValueRowStyle}>
                <span style={metricValueStyle}>{metric.value}</span>
                <span style={metricUnitStyle}>{metric.unit}</span>
              </div>
              <p style={metricLabelStyle}>{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={subsectionStyle}>
        <h3 style={subsectionHeadingStyle}>이용 후기</h3>
        <div style={reviewsGridStyle}>
          {chapter.reviewHighlights.map((review) => (
            <article
              key={`${review.date}-${review.quote}`}
              style={reviewCardStyle}
            >
              <p style={reviewQuoteStyle}>&ldquo;{review.quote}&rdquo;</p>
              <div style={reviewMetaStyle}>
                <span style={reviewRatingStyle}>
                  {formatRating(review.rating)}
                </span>
                <span style={reviewDateStyle}>{review.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OperationsChapter;
